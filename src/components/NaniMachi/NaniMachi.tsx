import { Stile, Tiles, Dtile, Format } from "@/components/Tile";
import { Akang, Chii, Dkang, Pong, Skang } from "@/components/Tile";
import { RDBlocks, FlatRDB, FormatRDTsumo, MANZU_ISOU, PINZU_ISOU, SOUZU_ISOU,  } from "@/lib/Tile";

export function NaniMachi() {
    const a = RDBlocks();
    return (
        <>
            <Tiles {...FormatRDTsumo(RDBlocks(MANZU_ISOU))}></Tiles>
            <br></br>
            <Tiles {...FormatRDTsumo(RDBlocks(PINZU_ISOU))}></Tiles>
            <br></br>
            <Tiles {...FormatRDTsumo(RDBlocks(SOUZU_ISOU))}></Tiles>
            <br></br>
            <Tiles {...FormatRDTsumo(RDBlocks(MANZU_ISOU))}></Tiles>
            <br></br>
            <Tiles {...FormatRDTsumo(RDBlocks(PINZU_ISOU))}></Tiles>
            <br></br>
            <Tiles {...FormatRDTsumo(RDBlocks(SOUZU_ISOU))}></Tiles>
            <br></br>
            {/* <Tile tile={"0m"} turned={false}></Tile>
            <Tile tile={"0s"} turned={false}></Tile>
            <Tile tile={"1z"} turned={false}></Tile>
            <Tile tile={"0x"} turned={true}></Tile>
            <Tile tile={"1x"} turned={false}></Tile>
            <br></br>
            <Tiles tiles={["1s", "2s", "3s"]}></Tiles>
            <br></br>
            <Tile tile={"5s"} turned={false}></Tile>
            <Dtile dtile={"5s"} utile={"0s"}></Dtile>
            <Tile tile={"5s"} turned={false}></Tile>
            <br></br>

            <Akang tile={"0m"}></Akang>
            <Pong tile="0m" sidx={0} omo={true}></Pong>
            <br></br> */}
            {/* <Dkang tile="0m" sidx={0} omo={true}></Dkang>
            <br></br>
            <Dkang tile="5m" sidx={0} omo={true}></Dkang>
            <br></br>
            <Dkang tile="0m" sidx={0}></Dkang>
            <br></br>
            <Dkang tile="5m" sidx={0}></Dkang>
            <br></br>
            <Dkang tile="0m" sidx={1} omo={true}></Dkang>
            <br></br>
            <Dkang tile="5m" sidx={1} omo={true}></Dkang>
            <br></br>
            <Dkang tile="0m" sidx={1}></Dkang>
            <br></br>
            <Dkang tile="5m" sidx={2}></Dkang>
            <br></br> */}
            {/* <Skang tile="0m" sidx={0} omo={true}></Skang>
            <br></br>
            <Skang tile="0m" sidx={0}></Skang>
            <br></br>
            <Skang tile="5m" sidx={0}></Skang>
            <br></br>
            <Skang tile="0m" sidx={1} omo={true}></Skang>
            <br></br>
            <Skang tile="0m" sidx={1}></Skang>
            <br></br>
            <Skang tile="5m" sidx={1}></Skang>
            <br></br>
            <Skang tile="0m" sidx={2} omo={true}></Skang>
            <br></br>
            <Skang tile="0m" sidx={2}></Skang>
            <br></br>
            <Skang tile="5m" sidx={2}></Skang>
            <br></br> */}
            {/* <Chii tile="1m" fidx={2}></Chii>
            <br></br>
            <Chii tile="8m" fidx={0}></Chii>
            <br></br>
            <Chii tile="9m" fidx={0}></Chii>
            <br></br>
            <Chii tile="0m" fidx={1}></Chii>
            <br></br>
            <Pong tile="0m" sidx={0}></Pong>
            <br></br>
            <Pong tile="0m" sidx={1}></Pong>
            <br></br>
            <Pong tile="0m" sidx={2}></Pong>
            <br></br>
            <Pong tile="0m" sidx={0} omo={true}></Pong>
            <br></br>
            <Pong tile="0m" sidx={1} omo={true}></Pong>
            <br></br>
            <Pong tile="0m" sidx={2} omo={true}></Pong>
            <br></br> */}
        </>
    );
}
