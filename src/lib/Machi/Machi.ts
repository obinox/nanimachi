import { kazet, manzut, pinzut, sangent, souzut, TILE_G, TILE_N, TILE_O, tilest, zihait } from "@/lib/Tile";
import { isSubset, rmDups } from "@/utility";

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

    const sved: tilest[][] = [];
    const tosv: tilest[][] = [];

    // const chit: tilest[][] = [];

    if (rem === "00001" || rem === "00022") {
        for (const t of [man, pin, sou, kaz, sgn]) {
            if (t.length % 3 == 0) {
                sved.push(t.sort((a, b) => TILE_O[a] - TILE_O[b]));
            } else {
                tosv.push(t.sort((a, b) => TILE_O[a] - TILE_O[b]));
            }
        }
    } else {
        out.length = 0;
    }

    // console.log(man, pin, sou, kaz, sgn);
    // console.log(sved, tosv, out);
    // console.log(man.length, pin.length, sou.length, kaz.length, sgn.length);

    const clear: boolean[] = [];
    let k = 0;

    const queue: tilest[][] = [];
    const qyxz: tilest[] = ["0x"];
    for (const sv of sved) {
        queue.push(sv);
        queue.push(qyxz);

        let state = false;

        while (queue.length > 0) {
            const target = queue.shift() ?? [];

            if (target.length == 1 && target === qyxz) {
                if (queue.length > 0) {
                    queue.splice(0, queue.length, ...rmDups(queue));
                    queue.push(qyxz);
                    continue;
                } else {
                    break;
                }
            } else if (target.length == 0) {
                state = true;
                continue;
            } else {
                // shuntsu
                for (const t of target) {
                    k++;
                    if (TILE_N[t] > 0) {
                        const sub = [...target];
                        const t0 = sub.find((s) => TILE_N[s] == TILE_N[t]) ?? "0x";
                        const t1 = sub.find((s) => TILE_N[s] == TILE_N[t] + 1) ?? "0x";
                        const t2 = sub.find((s) => TILE_N[s] == TILE_N[t] + 2) ?? "0x";
                        if (isSubset(sub, [t0, t1, t2])) {
                            sub.splice(sub.indexOf(t0), 1);
                            sub.splice(sub.indexOf(t1), 1);
                            sub.splice(sub.indexOf(t2), 1);
                            queue.push(sub);
                        }
                    }
                }
                // koutsu
                for (const t of target) {
                    k++;
                    const sub = [...target];
                    const t0 = sub.find((s) => TILE_N[s] == TILE_N[t]) ?? "0x";
                    if (isSubset(sub, [t0, t0, t0])) {
                        sub.splice(sub.indexOf(t0), 1);
                        sub.splice(sub.indexOf(t0), 1);
                        sub.splice(sub.indexOf(t0), 1);
                        queue.push(sub);
                    }
                }
            }
        }
        clear.push(state);
    }

    const part: tilest[][] = [];
    for (const sv of tosv) {
        queue.push(sv);
        queue.push(qyxz);

        while (queue.length > 0) {
            const target = queue.shift() ?? [];

            if (target.length == 1 && target === qyxz) {
                if (queue.length > 0) {
                    queue.splice(0, queue.length, ...rmDups(queue));
                    queue.push(qyxz);
                    continue;
                } else {
                    break;
                }
            } else if (target.length == 1) {
                part.push(target);
                continue;
            } else if (target.length == 2) {
                part.push(target);
                continue;
            } else {
                if (target.length == 4) {
                    part.push(target);
                }
                // shuntsu
                for (const t of target) {
                    k++;
                    if (TILE_N[t] > 0) {
                        const sub = [...target];
                        const t0 = sub.find((s) => TILE_N[s] == TILE_N[t]) ?? "0x";
                        const t1 = sub.find((s) => TILE_N[s] == TILE_N[t] + 1) ?? "0x";
                        const t2 = sub.find((s) => TILE_N[s] == TILE_N[t] + 2) ?? "0x";
                        if (isSubset(sub, [t0, t1, t2])) {
                            sub.splice(sub.indexOf(t0), 1);
                            sub.splice(sub.indexOf(t1), 1);
                            sub.splice(sub.indexOf(t2), 1);
                            queue.push(sub);
                        }
                    }
                }
                // koutsu
                for (const t of target) {
                    k++;
                    const sub = [...target];
                    const t0 = sub.find((s) => TILE_N[s] == TILE_N[t]) ?? "0x";
                    if (isSubset(sub, [t0, t0, t0])) {
                        sub.splice(sub.indexOf(t0), 1);
                        sub.splice(sub.indexOf(t0), 1);
                        sub.splice(sub.indexOf(t0), 1);
                        queue.push(sub);
                    }
                }
            }
        }
    }

    console.log(clear, k);
    console.log(part);
}

// 13      10     7     4    1
// 3333 1  333 1  33 1  3 1   1
// 333 22  33 22  3 22   22

// 12      9      6     3
// 3333    333    33    3

// 11      8      5     2
// 333 2   33 2   3 2    2

// 13 0 0 0
// 12 1 0 0
// 12 0 0 1
// 11 2 0 0
// 11 0 0 2
// 10 3 0 0
// 10 0 0 3
// 9 4 0 0
// 9 3 1 0
// 9 3 0 1
// 9 2 2 0
// 9 2 0 2
// 9 1 0 3
// 9 0 0 4
// 8 5 0 0
// 8 3 2 0
// 8 3 0 2
// 8 2 0 3
// 8 0 0 5
// 7 6 0 0
// 7 3 3 0
// 7 3 0 3
// 7 0 0 6
// 6 6 1 0
// 6 6 0 1
// 6 5 2 0
// 6 5 0 2
// 6 4 3 0
// 6 4 0 3
// 6 3 3 1
// 6 3 2 2
// 6 3 1 3
// 6 3 0 4
// 6 2 2 3
// 6 2 0 5
// 6 1 0 6
// 6 0 0 7
// 5 5 3 0
// 5 5 0 3
// 5 3 3 2
// 5 3 2 3
// 5 3 0 5
// 5 2 0 6
// 5 0 0 8
// 4 3 3 3
// 4 3 0 6
// 4 0 0 9
// 3 3 3 4
// 3 3 2 5
// 3 3 1 6
// 3 3 0 7
// 3 2 2 6
// 3 2 0 8
// 3 1 0 9
// 3 0 0 10
// 2 2 0 9
// 2 0 0 11
// 1 0 0 12
// 0 0 0 13
