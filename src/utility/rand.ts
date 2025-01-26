import { randomInt } from "crypto";

export function randInt(min: number, max: number): number {
    return randomInt(max - min) + min;
}
