import { Stile, Tiles, Dtile } from "@/components/Tile";
import { Akang, Chii, Dkang, Pong, Skang } from "@/components/Tile";
import { calc } from "@/lib/Machi";
import { RDBlocks, TFlat, FormatRDT, MANZU_ISOU, PINZU_ISOU, SOUZU_ISOU, tilest, FlatRDT, MFlat } from "@/lib/Tile";

export function NaniMachi() {
    const a: tilest[] = "2m 2m 4m 5m 6m 6m 7m 7m 8m 8m 8m 8m 9m".split(" ");
    const b: tilest[] = "3p 3p 3p 3p 4p 0p 6p 6p 7p 7p 8p 8p 9p".split(" ");
    // console.log(calc(a));
    // console.log(calc(b));

    // let c = FormatRDT(RDBlocks(MANZU_ISOU));
    // let k = 0;
    // while (c.agarus.length < 9) {
    //     c = FormatRDT(RDBlocks(MANZU_ISOU));
    //     k++;
    // }

    return (
        <>
            {/* <Tiles {...FlatRDT(Flat(a))}></Tiles>
            <br></br>
            <Tiles {...FlatRDT(Flat(b))}></Tiles>
            <br></br> */}
            {/* <Tiles {...c}></Tiles>
            {k}
            <br></br> */}
            <Tiles {...FormatRDT(RDBlocks(MANZU_ISOU))}></Tiles>
            <br></br>
            <Tiles {...FormatRDT(RDBlocks(PINZU_ISOU))}></Tiles>
            <br></br>
            <Tiles {...FormatRDT(RDBlocks(SOUZU_ISOU))}></Tiles>
            <br></br>
            <Tiles {...FormatRDT(RDBlocks(MANZU_ISOU))}></Tiles>
            <br></br>
            <Tiles {...FormatRDT(RDBlocks(PINZU_ISOU))}></Tiles>
            <br></br>
            <Tiles {...FormatRDT(RDBlocks(SOUZU_ISOU))}></Tiles>
            <br></br>
            <Tiles {...FormatRDT(RDBlocks())}></Tiles>
            <br></br>
        </>
    );
}
