import { Chii, Kang, Pong, Stile } from "@/components/Tile";
import { tilest } from "@/lib/Tile";
import { SHUNTSU, KANTSU, KOUTSU } from "@/lib/enums";
import { vtok } from "@/utility";

export function Tiles({ tiles, agaru, fuuro, fsidx }: { tiles: tilest[]; agaru?: string; fuuro?: tilest[][]; fsidx?: number[] }) {
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
