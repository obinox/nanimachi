import { tilest, isTile } from "@/lib/Tile";
import Image from "next/image";

export const T_WIDTH = 45;
export const T_HEIGHT = 65;
export const T_COEF = 1.5 * 0.7;
export const T_RUBY = 9;

export function Stile({ tile, turned = false, disable = false }: { tile: tilest | string; turned?: boolean; disable?: boolean }) {
    if (!isTile(tile)) {
        tile = "0x";
    }
    return (
        <div style={{ display: "inline-flex", position: "relative", width: "auto", height: T_WIDTH * T_COEF * 2, alignItems: "end", justifyContent: "center", opacity: disable ? 0.5 : 1 }}>
            <Image src={`/img/tiles/${turned ? "t" : ""}${tile}.svg`} alt={turned ? "t" : "" + tile} width={(turned ? T_HEIGHT : T_WIDTH) * T_COEF} height={(turned ? T_WIDTH : T_HEIGHT) * T_COEF} priority></Image>
        </div>
    );
}

export function Rtile({ tile, turned = false, ruby = [], disable = false }: { tile: tilest | string; turned?: boolean; ruby?: string[]; disable?: boolean }) {
    if (!isTile(tile)) {
        tile = "0x";
    }
    return (
        <div style={{ display: "inline-flex", position: "relative", width: "auto", height: T_WIDTH * T_COEF * 2, alignItems: "end", justifyContent: "center" }}>
            <Stile tile={tile} turned={turned} disable={disable}></Stile>
            <div style={{ display: "flex", flexDirection: "column", position: "absolute", bottom: T_HEIGHT * T_COEF, textAlign: "center", alignItems: "center", opacity: disable ? 0.5 : 1 }}>
                {ruby.map((e: string, i: number) => {
                    return (
                        <rt key={i} style={{ display: "block", fontSize: T_RUBY * T_COEF, color: "white" }}>
                            {e}
                        </rt>
                    );
                })}
            </div>
        </div>
    );
}

export function Dtile({ dtile, utile }: { dtile: tilest | string; utile?: tilest | string }) {
    return (
        <div style={{ display: "inline-flex", position: "relative", width: T_HEIGHT * T_COEF, height: T_WIDTH * T_COEF * 2 }}>
            <div style={{ display: "inline-flex", flexDirection: "column-reverse", position: "absolute", bottom: 0, height: 0 }}>
                <Stile tile={dtile} turned={true}></Stile>
                <Stile tile={utile ?? dtile} turned={true}></Stile>
            </div>
        </div>
    );
}
