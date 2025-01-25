import { Dtile, Tile } from "@/components/Tile";
import { tilename } from "@/constants/Tile";
import { RandomBlocks } from "@/components/Tile/RandomBlocks";
import { SHUNTSU } from "@/enums";
import { KANTSU, KOUTSU } from "@/enums/Mentsu";

export function Tiles({ tiles, tsumo }: { tiles: tilename[] | string[]; tsumo?: string }) {
    return (
        <>
            {tiles.map((t, idx) => (
                <Tile tile={t} key={idx}></Tile>
            ))}
            {tsumo && <Tile tile={tsumo} key="tsumo"></Tile>}
        </>
    );
}

export function Chii({ tile, fidx }: { tile: tilename; fidx: number }) {
    const tiles = SHUNTSU[tile].slice();

    fidx = Math.min(fidx, 2);
    fidx = Math.max(fidx, 0);

    const ftile = tiles[fidx];

    tiles.splice(fidx, 1);
    tiles.splice(0, 0, ftile);

    return (
        <>
            {tiles.map((t, idx) => (
                <Tile tile={t} turned={idx === 0} key={t + "$" + idx}></Tile>
            ))}
        </>
    );
}

export function Pong({ tile, sidx, omo = false }: { tile: tilename; sidx: number; omo?: boolean }) {
    const tiles = KOUTSU[tile].slice();

    sidx = Math.min(sidx, 3);
    sidx = Math.max(sidx, 1);
    sidx = sidx - 1;

    const ftile = tiles[omo ? 0 : 1];
    tiles.splice(omo ? 0 : 1, 1);
    tiles.splice(sidx, 0, ftile);

    return (
        <>
            {tiles.map((t, idx) => (
                <Tile tile={t} turned={idx === sidx} key={t + "$" + idx}></Tile>
            ))}
        </>
    );
}

export function Akang({ tile }: { tile: tilename }) {
    const tiles = KANTSU[tile].slice();

    tiles.splice(2, 2);
    tiles.splice(0, 0, "0x");
    tiles.splice(3, 0, "0x");

    return (
        <>
            {tiles.map((t, idx) => (
                <Tile tile={t} key={t + "$" + idx}></Tile>
            ))}
        </>
    );
}

export function Dkang({ tile, sidx, omo = false }: { tile: tilename; sidx: number; omo?: boolean }) {
    const tiles = KANTSU[tile].slice().sort();

    sidx = Math.min(sidx, 3);
    sidx = Math.max(sidx, 1);
    sidx = sidx - 1;

    if (sidx == 2) {
        sidx = 3;
    }

    const ftile = tiles[omo ? 0 : 1];
    tiles.splice(omo ? 0 : 1, 1);
    tiles.splice(sidx, 0, ftile);

    return (
        <>
            {tiles.map((t, idx) => (
                <Tile tile={t} turned={idx === sidx} key={t + "$" + idx}></Tile>
            ))}
        </>
    );
}

export function Skang({ tile, sidx, omo = false }: { tile: tilename; sidx: number; omo?: boolean }) {
    const tiles = KANTSU[tile].slice();

    sidx = Math.min(sidx, 3);
    sidx = Math.max(sidx, 1);
    sidx = sidx - 1;

    const ftile = tiles[omo ? 0 : 1];
    tiles.splice(omo ? 0 : 1, 1);
    tiles.splice(sidx, 0, ftile);

    return (
        <>
            {tiles.slice(0, 3).map((t, idx) => {
                if (idx === sidx) {
                    return <Dtile dtile={t} utile={tiles[3]} key={t + "$" + idx}></Dtile>;
                } else {
                    return <Tile tile={t} key={t + "$" + idx}></Tile>;
                }
            })}
        </>
    );
}

export function Kang({ tile, sidx, omo = false }: { tile: tilename; sidx: number; omo?: boolean }) {
    sidx = Math.min(sidx, 7);
    sidx = Math.max(sidx, 0);

    switch (sidx) {
        case 0 | 4:
            return <Akang tile={tile}></Akang>;
        case 1 | 2 | 3:
            return <Dkang tile={tile} sidx={sidx} omo={omo}></Dkang>;
        case 5 | 6 | 7:
            return <Skang tile={tile} sidx={sidx - 4} omo={omo}></Skang>;
        default:
            return <></>;
    }
}
