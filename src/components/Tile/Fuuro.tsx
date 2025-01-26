import { tiletype } from "@/constants/Tile";
import { KANTSU, KOUTSU, SHUNTSU } from "@/enums";
import { Stile, Dtile } from "@/components/Tile";

export function Chii({ tile, fidx = 0 }: { tile: tiletype; fidx?: number }) {
    const tiles = SHUNTSU[tile].slice();

    fidx = Math.min(fidx, 2);
    fidx = Math.max(fidx, 0);

    const ftile = tiles[fidx];

    tiles.splice(fidx, 1);
    tiles.splice(0, 0, ftile);

    return (
        <>
            {tiles.map((t, idx) => (
                <Stile tile={t} turned={idx === 0} key={t + "$" + idx}></Stile>
            ))}
        </>
    );
}

export function Pong({ tile, sidx = 0, omo = false }: { tile: tiletype; sidx?: number; omo?: boolean }) {
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
                <Stile tile={t} turned={idx === sidx} key={t + "$" + idx}></Stile>
            ))}
        </>
    );
}

export function Akang({ tile }: { tile: tiletype }) {
    const tiles = KANTSU[tile].slice();

    tiles.splice(2, 2);
    tiles.splice(0, 0, "0x");
    tiles.splice(3, 0, "0x");

    return (
        <>
            {tiles.map((t, idx) => (
                <Stile tile={t} key={t + "$" + idx}></Stile>
            ))}
        </>
    );
}

export function Dkang({ tile, sidx = 0, omo = false }: { tile: tiletype; sidx?: number; omo?: boolean }) {
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
                <Stile tile={t} turned={idx === sidx} key={t + "$" + idx}></Stile>
            ))}
        </>
    );
}

export function Skang({ tile, sidx = 0, omo = false }: { tile: tiletype; sidx?: number; omo?: boolean }) {
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
                    return <Stile tile={t} key={t + "$" + idx}></Stile>;
                }
            })}
        </>
    );
}

export function Kang({ tile, sidx = 0, omo = false }: { tile: tiletype; sidx?: number; omo?: boolean }) {
    sidx = Math.min(sidx, 7);
    sidx = Math.max(sidx, 0);

    switch (sidx) {
        case 0:
        case 4:
            return <Akang tile={tile}></Akang>;
        case 1:
        case 2:
        case 3:
            return <Dkang tile={tile} sidx={sidx} omo={omo}></Dkang>;
        case 5:
        case 6:
        case 7:
            return <Skang tile={tile} sidx={sidx - 4} omo={omo}></Skang>;
        default:
            return <></>;
    }
}
