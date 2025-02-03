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
}
