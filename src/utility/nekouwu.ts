import { TILE_G, TILE_N, TILE_O, tilest } from "@/lib/Tile";

export const tilesort = (a: tilest, b: tilest) => TILE_O[a] - TILE_O[b];
export const tilecomp = (t: tilest) => TILE_N[t] + TILE_G[t] * 10;
