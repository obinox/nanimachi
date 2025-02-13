import { kazet, manzut, pinzut, sangent, souzut, TILE_G, TILE_N, TILE_O, tilest, zihait } from "@/lib/Tile";
import { isSubset } from "@/utility";

type machi = "rml" | "rmr" | "shp" | "kan" | "pn3" | "pn7" | "tan";

type shpv = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type zihv = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface tenpai {
    tile: tilest;
    machi: machi;
}

export function delDups<T>(arr: T[], cond: (e: T) => T | string | number = (e) => JSON.stringify(e)): T[] {
    const set: Set<T | string | number> = new Set();
    const out: T[] = [];
    for (const e of arr) {
        const c = cond(e);
        if (!set.has(c)) {
            set.add(c);
            out.push(e);
        }
    }
    return out;
}
export function hasDups<T>(arr: T[], cond: (e: T) => T | string | number = (e) => JSON.stringify(e)): boolean {
    const set = new Set<T | string | number>();
    for (const e of arr) {
        const c = cond(e);
        if (set.has(c)) {
            return true;
        }
        set.add(c);
    }
    return false;
}
export function matDups<T>(arr: T[], cond: (e: T) => T | string | number = (e) => JSON.stringify(e)): T[] {
    const map = new Map<T | string | number, number>();
    const out: T[] = [];
    for (const e of arr) {
        const c = cond(e);
        if (!map.has(c)) {
            out.push(e);
        }
        map.set(c, (map.get(c) ?? 0) + 1);
    }
    return out.filter((e) => (map.get(cond(e)) ?? 0) % 2 !== 0);
}
export function subtract<T>(s: T[], a: T[]) {
    if (!isSubset(s, a)) {
        return [...s];
    }
    const out = [...s];
    for (const e of a) {
        out.splice(out.indexOf(e), 1);
    }
    return out;
}

export function calc(tiles: tilest[]) {
    const man: manzut[] = [];
    const pin: pinzut[] = [];
    const sou: souzut[] = [];
    const kaz: kazet[] = [];
    const sgn: sangent[] = [];

    const out: tilest[] = [];

    for (const t of tiles) {
        switch (TILE_G[t]) {
            case 0:
                man.push(<manzut>t);
                break;
            case 1:
                pin.push(<pinzut>t);
                break;
            case 2:
                sou.push(<souzut>t);
                break;
            case 3:
                kaz.push(<kazet>t);
                break;
            case 4:
                sgn.push(<sangent>t);
                break;
            default:
                break;
        }
    }

    const rem: string = [man.length, pin.length, sou.length, kaz.length, sgn.length]
        .map((n) => n % 3)
        .sort()
        .join("");
    const slv: tilest[][] = [];
    // const chit: tilest[][] = [];

    if (rem === "00001" || rem === "00022") {
        for (const t of [man, pin, sou, kaz, sgn]) {
            slv.push(t.sort((a, b) => TILE_O[a] - TILE_O[b]));
        }
    } else {
        out.length = 0;
    }

    // console.log(man, pin, sou, kaz, sgn);
    //console.log(sved, tosv, out);
    // console.log(man.length, pin.length, sou.length, kaz.length, sgn.length);
    const clr: boolean[] = [];
    let k = 0;
    const que: tilest[][] = [];
    const qyx: tilest[] = ["0x"];
    const matcht = (t: tilest) => TILE_N[t];
    const part: tilest[][] = [];
    for (const sv of slv) {
        que.length = 0;
        que.push(sv);
        que.push(qyx);
        let state = false;
        while (que.length > 0) {
            const tar = que.shift() ?? [];
            if (tar.length == 1 && tar === qyx) {
                if (que.length > 0) {
                    que.splice(0, que.length, ...delDups(que));
                    que.push(qyx);
                    continue;
                } else {
                    break;
                }
            } else if (tar.length == 1) {
                state = true;
                part.push(tar);
                continue;
            } else if (tar.length == 2) {
                if (tar.length != 2 || TILE_N[tar[1]] - TILE_N[tar[0]] < 3) {
                    state = true;
                    part.push(tar);
                }
                continue;
            } else if (tar.length == 0) {
                state = true;
                break;
            } else {
                if (tar.length == 4) {
                    const has = hasDups(tar, matcht);
                    const mat = matDups(tar, matcht);
                    if (has && (mat.length != 2 || TILE_N[mat[1]] - TILE_N[mat[0]] < 3)) {
                        state = true;
                        part.push(tar);
                    }
                } // shuntsu
                for (const t of tar) {
                    k++;
                    if (TILE_N[t] > 0) {
                        // not jih
                        const sub = [...tar];
                        const t0 = sub.find((s) => TILE_N[s] == TILE_N[t]) ?? "0x";
                        const t1 = sub.find((s) => TILE_N[s] == TILE_N[t] + 1) ?? "0x";
                        const t2 = sub.find((s) => TILE_N[s] == TILE_N[t] + 2) ?? "0x";
                        if (isSubset(sub, [t0, t1, t2])) {
                            sub.splice(sub.indexOf(t0), 1);
                            sub.splice(sub.indexOf(t1), 1);
                            sub.splice(sub.indexOf(t2), 1);
                            que.push(sub);
                        }
                    }
                } // koutsu
                for (const t of tar) {
                    k++;
                    const sub = [...tar];
                    const t0 = sub.find((s) => TILE_N[s] == TILE_N[t]) ?? "0x";
                    if (isSubset(sub, [t0, t0, t0])) {
                        sub.splice(sub.indexOf(t0), 1);
                        sub.splice(sub.indexOf(t0), 1);
                        sub.splice(sub.indexOf(t0), 1);
                        que.push(sub);
                    }
                }
            }
        }
        clr.push(state);
    }

    const tato: tilest[][] = [];
    // length 4  // add one tile  // do remove algorithm  // if remain tile is toitsu  // tile is valid
    console.log(clr, k);
    for (const p of part) {
        const met = matDups(p, matcht);
        console.log(p, p.length, "=>", subtract(p, met), "+", met, met.length);
    }
    if (rem === "00001") {
        // 4 -> 2/2 (rym/pen/kan)    // 4 -> 4/0 (shp)    // 1 -> 1 (tan)
    } else if (rem === "00022") {
        const toitsu: tilest[][][] = [[], [], [], [], []];
        const proto: tilest[][][] = [[], [], [], [], []];
    }
}
