import { Chii, Kang, Pong, Stile } from "@/components/Tile";
import { tilest } from "@/lib/Tile";
import { SHUNTSU, KANTSU, KOUTSU } from "@/lib/Enums";
import { vtok } from "@/utility";

export function Tiles({ tiles, agaru, agarus, fuuro, fsidx }: { tiles: tilest[]; agaru?: tilest; agarus?: tilest[]; fuuro?: tilest[][]; fsidx?: number[] }) {
    return (
        <>
            <div style={{ height: "auto" }}>
                {tiles.map((t, idx) => (
                    <Stile tile={t} key={idx}></Stile>
                ))}
                {agaru && "agaru: "}
                {agaru && <Stile tile={agaru} key="agaru"></Stile>}
                {agarus && "agarus: "}
                {agarus?.map((t, idx) => <Stile tile={t} key={idx}></Stile>)}
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
