import { Chii, Kang, Pong, Stile } from "@/components/Tile";
import { tiletype } from "@/constants/Tile";
import { SHUNTSU, KANTSU, KOUTSU } from "@/enums";
import { vtok } from "@/utility";

export function Tiles({ tiles, tsumo, fuuro }: { tiles: tiletype[]; tsumo?: string; fuuro?: tiletype[][] }) {
    return (
        <>
            {tiles.map((t, idx) => (
                <Stile tile={t} key={idx}></Stile>
            ))}
            {tsumo && "tsumo: "}
            {tsumo && <Stile tile={tsumo} key="tsumo"></Stile>}
            {fuuro?.length ? "fuuro: " : ""}
            {fuuro?.map((m, idx) => {
                console.log("fuuro: ", m);
                if (vtok(SHUNTSU, m)) {
                    return <Chii tile={vtok(SHUNTSU, m)} fidx={0} key={idx}></Chii>;
                } else if (vtok(KOUTSU, m)) {
                    return <Pong tile={vtok(KOUTSU, m)} sidx={0} key={idx}></Pong>;
                } else if (vtok(KANTSU, m)) {
                    console.log("K", vtok(KANTSU, m), m);
                    return <Kang tile={vtok(KANTSU, m)} sidx={0} key={idx}></Kang>;
                }
                return <></>;
            })}
        </>
    );
}
