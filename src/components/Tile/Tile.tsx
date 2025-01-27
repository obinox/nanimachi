import { tiletype, isTile } from "@/constants/Tile";
import Image from "next/image";

export const T_WIDTH = 45;
export const T_HEIGHT = 65;
export const T_COEF = 2;

export function Stile({ tile, turned = false }: { tile: tiletype | string; turned?: boolean }) {
    if (!isTile(tile)) {
        tile = "0x";
    }
    return (
        <div style={{ display: "inline-flex", position: "relative", width: "auto", height: T_WIDTH * T_COEF * 2, alignItems: "end" }}>
            <Image src={`/img/tiles/${turned ? "t" : ""}${tile}.svg`} alt={turned ? "t" : "" + tile} width={(turned ? T_HEIGHT : T_WIDTH) * T_COEF} height={(turned ? T_WIDTH : T_HEIGHT) * T_COEF} priority></Image>
        </div>
    );
}

export function Dtile({ dtile, utile }: { dtile: tiletype | string; utile?: tiletype | string }) {
    return (
        <div style={{ display: "inline-flex", position: "relative", width: T_HEIGHT * T_COEF, height: T_WIDTH * T_COEF * 2 }}>
            <div style={{ display: "inline-flex", flexDirection: "column-reverse", position: "absolute", bottom: 0, height: 0 }}>
                <Stile tile={dtile} turned={true}></Stile>
                <Stile tile={utile ?? dtile} turned={true}></Stile>
            </div>
        </div>
    );
}
