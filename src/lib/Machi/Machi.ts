import { DEFAULT_TILESET, TILE_G, TILE_N, TILE_O, tilest, YAOCHUU } from "@/lib/Tile";
import { isSubset, subtract, delDups, hasDups, matDups, tilecomp, tilesort } from "@/utility";
import { KOUTSU, SHUNTSU, TOITSU } from "@/lib/Enums";

export type machi = "rml" | "rmr" | "shp" | "kan" | "pn3" | "pn7" | "tan" | "chi" | "kmu" | "k13";

export interface tenpai {
    tile: tilest;
    machi: machi;
}

export function calc(tiles: tilest[], fuuro: tilest[] = [], tileset = { ...DEFAULT_TILESET }, debug = false) {
    if (debug) {
        console.log(...tiles);
    }
    const grp: tilest[][] = [[], [], [], [], []];
    const out: tenpai[] = [];
    const clr: boolean[] = [];

    for (const t of tiles) {
        grp[TILE_G[t]].push(t);
        tileset[t]--;
    }

    for (const t of fuuro) {
        tileset[t]--;
    }

    const rem: string = grp
        .map((n) => n.length % 3)
        .sort()
        .join("");
    const slv: tilest[][] = [];
    if (rem === "00001" || rem === "00022") {
        for (const t of grp) {
            slv.push(t.sort(tilesort));
        }
        const que: tilest[][] = [];
        const end: tilest[] = ["0x"];

        const part: tilest[][] = [];
        for (const sv of slv) {
            que.length = 0;
            que.push(sv);
            que.push(end);
            let state = false;
            while (que.length > 0) {
                const tar = que.shift() ?? [];
                if (tar.length == 1 && tar === end) {
                    if (que.length > 0) {
                        que.splice(0, que.length, ...delDups(que));
                        que.push(end);
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
                        const has = hasDups(tar, tilecomp);
                        const mat = matDups(tar, tilecomp);
                        if (has && (mat.length != 2 || TILE_N[mat[1]] - TILE_N[mat[0]] < 3)) {
                            state = true;
                            part.push(tar);
                        }
                    }
                    // console.log(...Object.values(SHUNTSU).filter((a) => isSubset(tar, a)));
                    // console.log(...Object.values(KOUTSU).filter((a) => isSubset(tar, a)));
                    for (const t of tar) {
                        if (TILE_G[t] < 3) {
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
                    }
                    for (const t of tar) {
                        const sub = [...tar];
                        let idx = 0;
                        const t0 = sub.find((s) => TILE_N[s] == TILE_N[t]) ?? "0x";
                        idx = sub.findIndex((s) => TILE_N[s] == TILE_N[t]) ?? -1;
                        const t1 = sub.find((s, i) => TILE_N[s] == TILE_N[t] && i > idx) ?? "0x";
                        idx = sub.findIndex((s, i) => TILE_N[s] == TILE_N[t] && i > idx) ?? -1;
                        const t2 = sub.find((s, i) => TILE_N[s] == TILE_N[t] && i > idx) ?? "0x";
                        if (isSubset(sub, [t0, t1, t2])) {
                            sub.splice(sub.indexOf(t0), 1);
                            sub.splice(sub.indexOf(t1), 1);
                            sub.splice(sub.indexOf(t2), 1);
                            que.push(sub);
                        }
                    }
                }
            }
            clr.push(state);
        }

        if (rem === "00022") {
            const tmp: tilest[][] = [];
            for (const t of part.filter((e) => hasDups(e, tilecomp))) {
                for (const s of part.filter((e) => TILE_G[e[0]] != TILE_G[t[0]])) {
                    tmp.push([...t, ...s].sort(tilesort));
                }
            }
            part.splice(0, part.length, ...delDups(tmp));
        }

        // for (const p of part) {
        //     const mat = matDups(p, tilecomp);
        //     console.log(p, p.length, "=>", subtract(p, mat), "+", mat, mat.length);
        // }

        for (const p of part) {
            if (p.length == 1) {
                for (const t of Object.values(TOITSU).filter((e) => isSubset(e, p))) {
                    const sub = subtract(t, p)[0];
                    out.push({ tile: sub, machi: "tan" });
                }
            } else if (p.length == 4) {
                const mat = matDups(p, tilecomp);
                const del = delDups(p, tilecomp);
                if (mat.length == 2) {
                    for (const t of Object.values(SHUNTSU).filter((e) => isSubset(e, mat))) {
                        const s = subtract(t, mat)[0];
                        const cmp = TILE_N[s] * 2 - (TILE_N[mat[0]] + TILE_N[mat[1]]);
                        if (cmp > 0) {
                            if (TILE_N[s] == 3) out.push({ tile: s, machi: "pn3" });
                            else out.push({ tile: s, machi: "rmr" });
                        }
                        if (cmp < 0) {
                            if (TILE_N[s] == 7) out.push({ tile: s, machi: "pn7" });
                            else out.push({ tile: s, machi: "rml" });
                        }
                        if (cmp == 0) out.push({ tile: s, machi: "kan" });
                    }
                } else if (mat.length == 0 && del.length == 2) {
                    const mae = p.slice(0, 2);
                    for (const t of Object.values(KOUTSU).filter((e) => isSubset(e, mae))) {
                        const sub = subtract(t, mae)[0];
                        out.push({ tile: sub, machi: "shp" });
                    }
                    const usr = p.slice(2, 4);
                    for (const t of Object.values(KOUTSU).filter((e) => isSubset(e, usr))) {
                        const sub = subtract(t, usr)[0];
                        out.push({ tile: sub, machi: "shp" });
                    }
                }
            }
        }
    } else {
        out.length = 0;
    }

    if (clr.some((e) => !e)) {
        out.length = 0;
    }

    // console.log(clr);

    const chit: tilest[] = [...tiles];
    if (matDups(chit, tilecomp).length == 1 && delDups(chit, tilecomp).length == 7) {
        const mat = matDups(chit, tilecomp);
        for (const t of Object.values(TOITSU).filter((e) => isSubset(e, mat))) {
            const sub = subtract(t, mat)[0];
            out.push({ tile: sub, machi: "chi" });
        }
    }

    if (out.length == 0) {
        const del = delDups(chit, tilecomp);
        if (isSubset(YAOCHUU, del)) {
            switch (del.length) {
                case 12:
                    out.push({ tile: subtract(YAOCHUU, del)[0], machi: "kmu" });
                    break;
                case 13:
                    for (const y of YAOCHUU) {
                        out.push({ tile: y, machi: "k13" });
                    }
                    break;
                default:
                    break;
            }
        }
    }

    // console.log(...out);
    // console.log(delDups(out));
    // console.log(delDups(out).filter((e) => tileset[e.tile] > 0));

    const tenshi: tenpai[] = [];
    const akuma: tenpai[] = [];
    for (const t of delDups(out)) {
        if (tileset[t.tile] > 0) {
            tenshi.push(t);
        } else {
            akuma.push(t);
        }
    }
    tenshi.sort((a: tenpai, b: tenpai) => TILE_O[a.tile] - TILE_O[b.tile]);
    akuma.sort((a: tenpai, b: tenpai) => TILE_O[a.tile] - TILE_O[b.tile]);

    return { tenshi, akuma };
}
