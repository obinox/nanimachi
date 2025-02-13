import { kazet, manzut, pinzut, sangent, souzut, TILE_G, TILE_N, TILE_O, tilest } from "@/lib/Tile";
import { isSubset, subtract, delDups, hasDups, matDups } from "@/utility";

type machi = "rml" | "rmr" | "shp" | "kan" | "pn3" | "pn7" | "tan";

type shpv = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type zihv = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface tenpai {
    tile: tilest;
    machi: machi;
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
