import { Chii, Kang, Pong, Stile } from "@/components/Tile";
import { tiletype } from "@/constants/Tile";
import { SHUNTSU, KANTSU, KOUTSU } from "@/enums";
import { vtok } from "@/utility";
import { T_COEF, T_WIDTH } from "./Tile";

export function Tiles({ tiles, agaru, fuuro, fsidx }: { tiles: tiletype[]; agaru?: string; fuuro?: tiletype[][]; fsidx?: number[] }) {
    return (
        <>
            <div style={{ height: "auto" }}>
                {tiles.map((t, idx) => (
                    <Stile tile={t} key={idx}></Stile>
                ))}
                {agaru && "agaru: "}
                {agaru && <Stile tile={agaru} key="agaru"></Stile>}
                {fuuro?.length ? "fuuro: " : ""}
                {fuuro?.map((m, idx) => {
                    console.log("fuuro: ", m);
                    if (vtok(SHUNTSU, m)) {
                        return <Chii tile={vtok(SHUNTSU, m)} fidx={(fsidx ?? [])[idx] ?? 0} key={idx}></Chii>;
                    } else if (vtok(KOUTSU, m)) {
                        return <Pong tile={vtok(KOUTSU, m)} sidx={(fsidx ?? [])[idx] ?? 0} key={idx}></Pong>;
                    } else if (vtok(KANTSU, m)) {
                        console.log("K", vtok(KANTSU, m), m);
                        return <Kang tile={vtok(KANTSU, m)} sidx={(fsidx ?? [])[idx] ?? 0} key={idx}></Kang>;
                    }
                    return <></>;
                })}
            </div>
        </>
    );
}
