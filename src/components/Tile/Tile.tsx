import { tilename, isTile } from "@/constants/Tile";
import Image from "next/image";

const WIDTH = 45;
const HEIGHT = 65;
const COEF = 2;

export function Tile({ tile, turned = false }: { tile: tilename | string; turned?: boolean }) {
    if (!isTile(tile)) {
        tile = "0x";
    }
    return <Image src={`/img/tiles/${turned ? "t" : ""}${tile}.svg`} alt={turned ? "t" : "" + tile} width={(turned ? HEIGHT : WIDTH) * COEF} height={(turned ? WIDTH : HEIGHT) * COEF} priority></Image>;
}

export function Dtile({ dtile, utile }: { dtile: tilename | string; utile?: tilename | string }) {
    return (
        <>
            <div style={{ display: "inline-block", position: "relative", width: HEIGHT * COEF, height: WIDTH * COEF * 2 }}>
                <div style={{ display: "inline-flex", flexDirection: "column-reverse", position: "absolute", bottom: 0 }}>
                    <Tile tile={dtile} turned={true}></Tile>
                    <Tile tile={utile ?? dtile} turned={true}></Tile>
                </div>
            </div>
        </>
    );
}
