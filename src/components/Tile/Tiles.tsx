import { Chii, Kang, Pong, Stile, T_COEF, T_HEIGHT } from "@/components/Tile";
import { tilest } from "@/lib/Tile";
import { SHUNTSU, KANTSU, KOUTSU } from "@/lib/Enums";
import { delDups, vtok } from "@/utility";
import { tenpai } from "@/lib/Machi/Machi";

const machiref = {
    rml: "양면(+0)",
    rmr: "양면(+0)",
    shp: "샤보(+0)",
    kan: "간짱(+2)",
    pn3: "변짱(+2)",
    pn7: "변짱(+2)",
    tan: "단기(+2)",
    chi: "치또이(25)",
    kmu: "국사무쌍",
    k13: "국사13면",
};

export function Tiles({ tiles, agaru, agarus, fuuro, fsidx, tenpais }: { tiles: tilest[]; agaru?: tilest; agarus?: tilest[]; fuuro?: tilest[][]; fsidx?: number[]; tenpais?: tenpai[] }) {
    return (
        <>
            <div style={{ whiteSpace: "nowrap" }}>
                <div style={{ display: "flex", alignItems: "flex-end", height: T_HEIGHT * T_COEF * 1.7 }}>
                    {tiles.map((t, idx) => (
                        <Stile tile={t} key={idx}></Stile>
                    ))}
                    {agaru && "agaru: "}
                    {agaru && <Stile tile={agaru} key="agaru"></Stile>}
                    {agarus && "agarus: "}
                    {agarus?.map((t, idx) => <Stile tile={t} key={idx} ruby={delDups(tenpais?.filter((e) => e.tile == t).map((e) => machiref[e.machi]) ?? [])}></Stile>)}
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
            </div>
        </>
    );
}
