import { DEFAULT_TILESET, TILE_N, tilest, YAOCHUU } from "@/lib/Tile";
import { possibility } from "@/lib/Enums";
import { delDups, isSubset, randInt, tilesort } from "@/utility";
import { calc } from "@/lib/Machi";

type mentsutype = "shuntsu" | "koutsu" | "kantsu";

/* 
shuntsu 4*4*2*133 
    1 , 9 => *1
    2 , 8 => *2
    3 ~ 7 => *3
koutsu 3*133
kantsu 3

chitiotsu 3%
kokushi 0.04%
*/

const W_KOKUSHI = 4;
const W_CHITOI = 300;

export function RDBlocks(tileset = DEFAULT_TILESET) {
    const yama: tilest[] = Object.entries(tileset).flatMap(([key, count]) => new Array(count).fill(key));
    const mtsus: tilest[][] = [];
    const fuuro: tilest[][] = [];

    const alter = randInt(0, 10000);
    if (alter < W_KOKUSHI && isSubset(yama, YAOCHUU)) {
        const mtsu: tilest[] = [];
        for (const y of YAOCHUU) {
            mtsu.push(y);
        }
        mtsus.push(mtsu);
        mtsus.push([YAOCHUU[randInt(0, 13)]]);
    } else if (alter < W_CHITOI) {
        for (let i = 0; i < 7; i++) {
            const idx = randInt(0, yama.length);
            const curt = yama[idx];

            const mtsu = possibility[curt].toitsu[0];

            if (isSubset(yama, mtsu) && !mtsus.flat().includes(mtsu[1])) {
                for (const t of mtsu) {
                    yama.splice(yama.indexOf(t), 1);
                }
                mtsus.push(mtsu);
            } else {
                i--;
            }
        }
    } else {
        for (let i = 0; i < 4; i++) {
            const idx = randInt(0, yama.length);
            const curt = yama[idx];

            let coef = 1;
            switch (TILE_N[curt]) {
                case 0:
                case -1:
                    coef = 0;
                    break;
                case 1:
                case 9:
                    coef = 1;
                    break;
                case 2:
                case 8:
                    coef = 2;
                    break;
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    coef = 3;
                    break;
                default:
                    break;
            }
            const rand = randInt(0, 3 + 3 * 133 + 4 * 4 * 2 * 133 * coef);
            const midx = randInt(0, 60);

            let mtsutype: mentsutype;
            if (rand < 3) {
                mtsutype = "kantsu";
            } else if (rand < 3 + 3 * 133) {
                mtsutype = "koutsu";
            } else {
                mtsutype = "shuntsu";
            }
            const mtsu = possibility[curt][mtsutype][midx % possibility[curt][mtsutype].length];

            if (isSubset(yama, mtsu)) {
                switch (mtsutype) {
                    case "kantsu":
                        for (const t of mtsu) {
                            yama.splice(yama.indexOf(t), 1);
                        }
                        fuuro.push(mtsu);
                        break;

                    default:
                        for (const t of mtsu) {
                            yama.splice(yama.indexOf(t), 1);
                        }
                        mtsus.push(mtsu);
                        break;
                }
            } else {
                i--;
            }
        }
        for (let i = 0; i < 1; i++) {
            const idx = randInt(0, yama.length);
            const curt = yama[idx];

            const mtsu = possibility[curt].toitsu[0];

            // console.log(mtsu);

            if (isSubset(yama, mtsu)) {
                for (const t of mtsu) {
                    yama.splice(yama.indexOf(t), 1);
                }
                mtsus.push(mtsu);
            } else {
                i--;
            }
        }
    }
    // console.log(mtsus);
    // console.log(fuuro);
    // mtsus.push(...kan);
    return { mtsus, fuuro };
}

export function FlatRDB({ mtsus, fuuro }: { mtsus: tilest[][]; fuuro: tilest[][] }) {
    const tiles: tilest[] = [];
    for (const m of mtsus) {
        tiles.push(...m);
    }
    tiles.sort(tilesort);
    for (const m of fuuro) {
        tiles.push(...m);
    }
    return tiles;
}

export function Format({ mtsus, fuuro }: { mtsus: tilest[][]; fuuro: tilest[][] }) {
    const tiles: tilest[] = [];
    for (const m of mtsus) {
        tiles.push(...m);
    }
    tiles.sort(tilesort);

    const fsidx: number[] = [];
    for (let i = 0; i < fuuro.length; i++) {
        fsidx.push(randInt(0, 8));
    }

    return { tiles, fuuro, fsidx };
}

export function FormatRDTsumo({ mtsus, fuuro }: { mtsus: tilest[][]; fuuro: tilest[][] }) {
    const tiles: tilest[] = [];
    for (const m of mtsus) {
        tiles.push(...m);
    }
    tiles.sort(tilesort);

    const idx = randInt(0, tiles.length);
    const agaru = tiles[idx];

    tiles.splice(idx, 1);

    const fsidx: number[] = [];
    for (let i = 0; i < fuuro.length; i++) {
        fsidx.push(randInt(0, 8));
    }

    const agarus: tilest[] = delDups(calc(tiles).map((e) => e.tile)).sort(tilesort);

    return { tiles, fuuro, agaru, agarus, fsidx };
}

/**
TILE.forEach((e) => {
    const a = Object.entries(SHUNTSU)
        .filter(([key, shun]) => {
            return shun.includes(e);
        })
        .map(([key, shun]) => {
            return shun;
        });
    possibility[e].shuntsu.push(...a);
    possibility[e].toitsu.push(TOITSU[e]);
    possibility[e].koutsu.push(KOUTSU[e]);
    possibility[e].kantsu.push(KANTSU[e]);
});
console.log(possibility);

return ["0x"];
 */
