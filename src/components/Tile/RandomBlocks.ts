import { MAN, PIN, SOU, TILE, TILE_O, tilename, ZIH } from "@/constants/Tile";
import { DEFAULT_TILESET, TILE_N } from "@/constants/Tile";
import { KANTSU, KOUTSU, SHUNTSU, TOITSU } from "@/enums";
import { isSubset, randInt } from "@/utility";

type pssb = {
    shuntsu: tilename[][];
    koutsu: tilename[][];
    kantsu: tilename[][];
    toitsu: tilename[][];
};
type mentsutype = "shuntsu" | "koutsu" | "kantsu";

const possibility: Record<tilename, pssb> = {
    "0m": {
        shuntsu: [
            ["0m", "6m", "7m"],
            ["3m", "4m", "0m"],
            ["4m", "0m", "6m"],
        ],
        koutsu: [["0m", "5m", "5m"]],
        kantsu: [["0m", "5m", "5m", "5m"]],
        toitsu: [["0m", "5m"]],
    },
    "1m": {
        shuntsu: [["1m", "2m", "3m"]],
        koutsu: [["1m", "1m", "1m"]],
        kantsu: [["1m", "1m", "1m", "1m"]],
        toitsu: [["1m", "1m"]],
    },
    "2m": {
        shuntsu: [
            ["1m", "2m", "3m"],
            ["2m", "3m", "4m"],
        ],
        koutsu: [["2m", "2m", "2m"]],
        kantsu: [["2m", "2m", "2m", "2m"]],
        toitsu: [["2m", "2m"]],
    },
    "3m": {
        shuntsu: [
            ["1m", "2m", "3m"],
            ["2m", "3m", "4m"],
            ["3m", "4m", "5m"],
            ["3m", "4m", "0m"],
        ],
        koutsu: [["3m", "3m", "3m"]],
        kantsu: [["3m", "3m", "3m", "3m"]],
        toitsu: [["3m", "3m"]],
    },
    "4m": {
        shuntsu: [
            ["2m", "3m", "4m"],
            ["3m", "4m", "5m"],
            ["4m", "5m", "6m"],
            ["3m", "4m", "0m"],
            ["4m", "0m", "6m"],
        ],
        koutsu: [["4m", "4m", "4m"]],
        kantsu: [["4m", "4m", "4m", "4m"]],
        toitsu: [["4m", "4m"]],
    },
    "5m": {
        shuntsu: [
            ["3m", "4m", "5m"],
            ["4m", "5m", "6m"],
            ["5m", "6m", "7m"],
        ],
        koutsu: [["5m", "5m", "5m"]],
        kantsu: [["5m", "5m", "5m", "0m"]],
        toitsu: [["5m", "5m"]],
    },
    "6m": {
        shuntsu: [
            ["0m", "6m", "7m"],
            ["4m", "5m", "6m"],
            ["5m", "6m", "7m"],
            ["6m", "7m", "8m"],
            ["4m", "0m", "6m"],
        ],
        koutsu: [["6m", "6m", "6m"]],
        kantsu: [["6m", "6m", "6m", "6m"]],
        toitsu: [["6m", "6m"]],
    },
    "7m": {
        shuntsu: [
            ["0m", "6m", "7m"],
            ["5m", "6m", "7m"],
            ["6m", "7m", "8m"],
            ["7m", "8m", "9m"],
        ],
        koutsu: [["7m", "7m", "7m"]],
        kantsu: [["7m", "7m", "7m", "7m"]],
        toitsu: [["7m", "7m"]],
    },
    "8m": {
        shuntsu: [
            ["6m", "7m", "8m"],
            ["7m", "8m", "9m"],
        ],
        koutsu: [["8m", "8m", "8m"]],
        kantsu: [["8m", "8m", "8m", "8m"]],
        toitsu: [["8m", "8m"]],
    },
    "9m": {
        shuntsu: [["7m", "8m", "9m"]],
        koutsu: [["9m", "9m", "9m"]],
        kantsu: [["9m", "9m", "9m", "9m"]],
        toitsu: [["9m", "9m"]],
    },
    "0p": {
        shuntsu: [
            ["0p", "6p", "7p"],
            ["3p", "4p", "0p"],
            ["4p", "0p", "6p"],
        ],
        koutsu: [["0p", "5p", "5p"]],
        kantsu: [["0p", "5p", "5p", "5p"]],
        toitsu: [["0p", "5p"]],
    },
    "1p": {
        shuntsu: [["1p", "2p", "3p"]],
        koutsu: [["1p", "1p", "1p"]],
        kantsu: [["1p", "1p", "1p", "1p"]],
        toitsu: [["1p", "1p"]],
    },
    "2p": {
        shuntsu: [
            ["1p", "2p", "3p"],
            ["2p", "3p", "4p"],
        ],
        koutsu: [["2p", "2p", "2p"]],
        kantsu: [["2p", "2p", "2p", "2p"]],
        toitsu: [["2p", "2p"]],
    },
    "3p": {
        shuntsu: [
            ["1p", "2p", "3p"],
            ["2p", "3p", "4p"],
            ["3p", "4p", "5p"],
            ["3p", "4p", "0p"],
        ],
        koutsu: [["3p", "3p", "3p"]],
        kantsu: [["3p", "3p", "3p", "3p"]],
        toitsu: [["3p", "3p"]],
    },
    "4p": {
        shuntsu: [
            ["2p", "3p", "4p"],
            ["3p", "4p", "5p"],
            ["4p", "5p", "6p"],
            ["3p", "4p", "0p"],
            ["4p", "0p", "6p"],
        ],
        koutsu: [["4p", "4p", "4p"]],
        kantsu: [["4p", "4p", "4p", "4p"]],
        toitsu: [["4p", "4p"]],
    },
    "5p": {
        shuntsu: [
            ["3p", "4p", "5p"],
            ["4p", "5p", "6p"],
            ["5p", "6p", "7p"],
        ],
        koutsu: [["5p", "5p", "5p"]],
        kantsu: [["5p", "5p", "5p", "0p"]],
        toitsu: [["5p", "5p"]],
    },
    "6p": {
        shuntsu: [
            ["0p", "6p", "7p"],
            ["4p", "5p", "6p"],
            ["5p", "6p", "7p"],
            ["6p", "7p", "8p"],
            ["4p", "0p", "6p"],
        ],
        koutsu: [["6p", "6p", "6p"]],
        kantsu: [["6p", "6p", "6p", "6p"]],
        toitsu: [["6p", "6p"]],
    },
    "7p": {
        shuntsu: [
            ["0p", "6p", "7p"],
            ["5p", "6p", "7p"],
            ["6p", "7p", "8p"],
            ["7p", "8p", "9p"],
        ],
        koutsu: [["7p", "7p", "7p"]],
        kantsu: [["7p", "7p", "7p", "7p"]],
        toitsu: [["7p", "7p"]],
    },
    "8p": {
        shuntsu: [
            ["6p", "7p", "8p"],
            ["7p", "8p", "9p"],
        ],
        koutsu: [["8p", "8p", "8p"]],
        kantsu: [["8p", "8p", "8p", "8p"]],
        toitsu: [["8p", "8p"]],
    },
    "9p": {
        shuntsu: [["7p", "8p", "9p"]],
        koutsu: [["9p", "9p", "9p"]],
        kantsu: [["9p", "9p", "9p", "9p"]],
        toitsu: [["9p", "9p"]],
    },
    "0s": {
        shuntsu: [
            ["0s", "6s", "7s"],
            ["3s", "4s", "0s"],
            ["4s", "0s", "6s"],
        ],
        koutsu: [["0s", "5s", "5s"]],
        kantsu: [["0s", "5s", "5s", "5s"]],
        toitsu: [["0s", "5s"]],
    },
    "1s": {
        shuntsu: [["1s", "2s", "3s"]],
        koutsu: [["1s", "1s", "1s"]],
        kantsu: [["1s", "1s", "1s", "1s"]],
        toitsu: [["1s", "1s"]],
    },
    "2s": {
        shuntsu: [
            ["1s", "2s", "3s"],
            ["2s", "3s", "4s"],
        ],
        koutsu: [["2s", "2s", "2s"]],
        kantsu: [["2s", "2s", "2s", "2s"]],
        toitsu: [["2s", "2s"]],
    },
    "3s": {
        shuntsu: [
            ["1s", "2s", "3s"],
            ["2s", "3s", "4s"],
            ["3s", "4s", "5s"],
            ["3s", "4s", "0s"],
        ],
        koutsu: [["3s", "3s", "3s"]],
        kantsu: [["3s", "3s", "3s", "3s"]],
        toitsu: [["3s", "3s"]],
    },
    "4s": {
        shuntsu: [
            ["2s", "3s", "4s"],
            ["3s", "4s", "5s"],
            ["4s", "5s", "6s"],
            ["3s", "4s", "0s"],
            ["4s", "0s", "6s"],
        ],
        koutsu: [["4s", "4s", "4s"]],
        kantsu: [["4s", "4s", "4s", "4s"]],
        toitsu: [["4s", "4s"]],
    },
    "5s": {
        shuntsu: [
            ["3s", "4s", "5s"],
            ["4s", "5s", "6s"],
            ["5s", "6s", "7s"],
        ],
        koutsu: [["5s", "5s", "5s"]],
        kantsu: [["5s", "5s", "5s", "0s"]],
        toitsu: [["5s", "5s"]],
    },
    "6s": {
        shuntsu: [
            ["0s", "6s", "7s"],
            ["4s", "5s", "6s"],
            ["5s", "6s", "7s"],
            ["6s", "7s", "8s"],
            ["4s", "0s", "6s"],
        ],
        koutsu: [["6s", "6s", "6s"]],
        kantsu: [["6s", "6s", "6s", "6s"]],
        toitsu: [["6s", "6s"]],
    },
    "7s": {
        shuntsu: [
            ["0s", "6s", "7s"],
            ["5s", "6s", "7s"],
            ["6s", "7s", "8s"],
            ["7s", "8s", "9s"],
        ],
        koutsu: [["7s", "7s", "7s"]],
        kantsu: [["7s", "7s", "7s", "7s"]],
        toitsu: [["7s", "7s"]],
    },
    "8s": {
        shuntsu: [
            ["6s", "7s", "8s"],
            ["7s", "8s", "9s"],
        ],
        koutsu: [["8s", "8s", "8s"]],
        kantsu: [["8s", "8s", "8s", "8s"]],
        toitsu: [["8s", "8s"]],
    },
    "9s": {
        shuntsu: [["7s", "8s", "9s"]],
        koutsu: [["9s", "9s", "9s"]],
        kantsu: [["9s", "9s", "9s", "9s"]],
        toitsu: [["9s", "9s"]],
    },
    "1z": {
        shuntsu: [["1z", "1z", "1z"]],
        koutsu: [["1z", "1z", "1z"]],
        kantsu: [["1z", "1z", "1z", "1z"]],
        toitsu: [["1z", "1z"]],
    },
    "2z": {
        shuntsu: [["2z", "2z", "2z"]],
        koutsu: [["2z", "2z", "2z"]],
        kantsu: [["2z", "2z", "2z", "2z"]],
        toitsu: [["2z", "2z"]],
    },
    "3z": {
        shuntsu: [["3z", "3z", "3z"]],
        koutsu: [["3z", "3z", "3z"]],
        kantsu: [["3z", "3z", "3z", "3z"]],
        toitsu: [["3z", "3z"]],
    },
    "4z": {
        shuntsu: [["4z", "4z", "4z"]],
        koutsu: [["4z", "4z", "4z"]],
        kantsu: [["4z", "4z", "4z", "4z"]],
        toitsu: [["4z", "4z"]],
    },
    "5z": {
        shuntsu: [["5z", "5z", "5z"]],
        koutsu: [["5z", "5z", "5z"]],
        kantsu: [["5z", "5z", "5z", "5z"]],
        toitsu: [["5z", "5z"]],
    },
    "6z": {
        shuntsu: [["6z", "6z", "6z"]],
        koutsu: [["6z", "6z", "6z"]],
        kantsu: [["6z", "6z", "6z", "6z"]],
        toitsu: [["6z", "6z"]],
    },
    "7z": {
        shuntsu: [["7z", "7z", "7z"]],
        koutsu: [["7z", "7z", "7z"]],
        kantsu: [["7z", "7z", "7z", "7z"]],
        toitsu: [["7z", "7z"]],
    },
    "0x": {
        shuntsu: [["0x", "0x", "0x"]],
        koutsu: [["0x", "0x", "0x"]],
        kantsu: [["0x", "0x", "0x", "0x"]],
        toitsu: [["0x", "0x"]],
    },
};

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

export function RandomBlocks(tileset = DEFAULT_TILESET) {
    const yama: tilename[] = Object.entries(tileset).flatMap(([key, count]) => new Array(count).fill(key));
    const mtsus: tilename[][] = [];
    const kan: tilename[][] = [];

    for (let i = 0; i < 4; i++) {
        const idx = randInt(0, yama.length);
        const curt = yama[idx];

        let coef = 1;
        switch (TILE_N[curt]) {
            case 0 | -1:
                coef = 0;
                break;
            case 1 | 9:
                coef = 1;
                break;
            case 2 | 8:
                coef = 2;
                break;
            case 3 | 4 | 5 | 6 | 7:
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

        // console.log(mtsu);

        if (isSubset(yama, mtsu)) {
            switch (mtsutype) {
                case "kantsu":
                    mtsu.forEach((t) => {
                        yama.splice(yama.indexOf(t), 1);
                    });
                    kan.push(mtsu);
                    break;

                default:
                    mtsu.forEach((t) => {
                        yama.splice(yama.indexOf(t), 1);
                    });
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
            mtsu.forEach((t) => {
                yama.splice(yama.indexOf(t), 1);
            });
            mtsus.push(mtsu);
        } else {
            i--;
        }
    }
    console.log(mtsus);
    console.log(kan);
    // mtsus.push(...kan);
    return { mtsus, kan };
}

export function Flat({ mtsus, kan }: { mtsus: tilename[][]; kan: tilename[][] }) {
    const tiles: tilename[] = [];
    mtsus.forEach((m) => {
        tiles.push(...m);
    });
    tiles.sort((a, b) => TILE_O[a] - TILE_O[b]);
    kan.forEach((m) => {
        tiles.push(...m);
    });
    return tiles;
}

// TILE.forEach((e) => {
//     const a = Object.entries(SHUNTSU)
//         .filter(([key, shun]) => {
//             return shun.includes(e);
//         })
//         .map(([key, shun]) => {
//             return shun;
//         });
//     possibility[e].shuntsu.push(...a);
//     possibility[e].toitsu.push(TOITSU[e]);
//     possibility[e].koutsu.push(KOUTSU[e]);
//     possibility[e].kantsu.push(KANTSU[e]);
// });
// console.log(possibility);

// return ["0x"];
