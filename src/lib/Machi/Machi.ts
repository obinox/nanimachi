import { manzut, pinzut, souzut, TILE_G, tilest, zihait } from "@/lib/Tile";

type machi = "ryanmen" | "shanpon" | "kanchan" | "penchan" | "tanki";

export function calc(tiles: tilest[]) {
    const man: manzut[] = [];
    const pin: pinzut[] = [];
    const sou: souzut[] = [];
    const zih: zihait[] = [];

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
            case 4:
                zih.push(<zihait>t);
                break;
            default:
                break;
        }
    }
    console.log(man, pin, sou, zih);
    console.log(man.length, pin.length, sou.length, zih.length);
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
