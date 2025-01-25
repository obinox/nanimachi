import { tilename } from "@/constants/Tile";

type tileref = {
    idx: number;
    acr: string;
};
type tilerec = Record<string, tileref>;

export const TileRef: tilerec = {
    MAN1: { idx: 0x01, acr: "1m" },
    MAN2: { idx: 0x02, acr: "2m" },
    MAN3: { idx: 0x03, acr: "3m" },
    MAN4: { idx: 0x04, acr: "4m" },
    MAN5: { idx: 0x05, acr: "5m" },
    MAN6: { idx: 0x06, acr: "6m" },
    MAN7: { idx: 0x07, acr: "7m" },
    MAN8: { idx: 0x08, acr: "8m" },
    MAN9: { idx: 0x09, acr: "9m" },
    PIN1: { idx: 0x11, acr: "1p" },
    PIN2: { idx: 0x12, acr: "2p" },
    PIN3: { idx: 0x13, acr: "3p" },
    PIN4: { idx: 0x14, acr: "4p" },
    PIN5: { idx: 0x15, acr: "5p" },
    PIN6: { idx: 0x16, acr: "6p" },
    PIN7: { idx: 0x17, acr: "7p" },
    PIN8: { idx: 0x18, acr: "8p" },
    PIN9: { idx: 0x19, acr: "9p" },
    SOU1: { idx: 0x21, acr: "1s" },
    SOU2: { idx: 0x22, acr: "2s" },
    SOU3: { idx: 0x23, acr: "3s" },
    SOU4: { idx: 0x24, acr: "4s" },
    SOU5: { idx: 0x25, acr: "5s" },
    SOU6: { idx: 0x26, acr: "6s" },
    SOU7: { idx: 0x27, acr: "7s" },
    SOU8: { idx: 0x28, acr: "8s" },
    SOU9: { idx: 0x29, acr: "9s" },
    ZIH1: { idx: 0x31, acr: "1z" },
    ZIH2: { idx: 0x32, acr: "2z" },
    ZIH3: { idx: 0x33, acr: "3z" },
    ZIH4: { idx: 0x34, acr: "4z" },
    ZIH5: { idx: 0x35, acr: "5z" },
    ZIH6: { idx: 0x36, acr: "6z" },
    ZIH7: { idx: 0x37, acr: "7z" },
};

export const SHUNTSU: Record<tilename, tilename[]> = {
    "0m": ["0m", "6m", "7m"],
    "1m": ["1m", "2m", "3m"],
    "2m": ["2m", "3m", "4m"],
    "3m": ["3m", "4m", "5m"],
    "4m": ["4m", "5m", "6m"],
    "5m": ["5m", "6m", "7m"],
    "6m": ["6m", "7m", "8m"],
    "7m": ["7m", "8m", "9m"],
    "8m": ["3m", "4m", "0m"],
    "9m": ["4m", "0m", "6m"],
    "0p": ["0p", "6p", "7p"],
    "1p": ["1p", "2p", "3p"],
    "2p": ["2p", "3p", "4p"],
    "3p": ["3p", "4p", "5p"],
    "4p": ["4p", "5p", "6p"],
    "5p": ["5p", "6p", "7p"],
    "6p": ["6p", "7p", "8p"],
    "7p": ["7p", "8p", "9p"],
    "8p": ["3p", "4p", "0p"],
    "9p": ["4p", "0p", "6p"],
    "0s": ["0s", "6s", "7s"],
    "1s": ["1s", "2s", "3s"],
    "2s": ["2s", "3s", "4s"],
    "3s": ["3s", "4s", "5s"],
    "4s": ["4s", "5s", "6s"],
    "5s": ["5s", "6s", "7s"],
    "6s": ["6s", "7s", "8s"],
    "7s": ["7s", "8s", "9s"],
    "8s": ["3s", "4s", "0s"],
    "9s": ["4s", "0s", "6s"],
    "1z": ["1z", "1z", "1z"],
    "2z": ["2z", "2z", "2z"],
    "3z": ["3z", "3z", "3z"],
    "4z": ["4z", "4z", "4z"],
    "5z": ["5z", "5z", "5z"],
    "6z": ["6z", "6z", "6z"],
    "7z": ["7z", "7z", "7z"],
    "0x": ["0x", "0x", "0x"],
};

export const KOUTSU: Record<tilename, tilename[]> = {
    "0m": ["0m", "5m", "5m"],
    "1m": ["1m", "1m", "1m"],
    "2m": ["2m", "2m", "2m"],
    "3m": ["3m", "3m", "3m"],
    "4m": ["4m", "4m", "4m"],
    "5m": ["5m", "5m", "5m"],
    "6m": ["6m", "6m", "6m"],
    "7m": ["7m", "7m", "7m"],
    "8m": ["8m", "8m", "8m"],
    "9m": ["9m", "9m", "9m"],
    "0p": ["0p", "5p", "5p"],
    "1p": ["1p", "1p", "1p"],
    "2p": ["2p", "2p", "2p"],
    "3p": ["3p", "3p", "3p"],
    "4p": ["4p", "4p", "4p"],
    "5p": ["5p", "5p", "5p"],
    "6p": ["6p", "6p", "6p"],
    "7p": ["7p", "7p", "7p"],
    "8p": ["8p", "8p", "8p"],
    "9p": ["9p", "9p", "9p"],
    "0s": ["0s", "5s", "5s"],
    "1s": ["1s", "1s", "1s"],
    "2s": ["2s", "2s", "2s"],
    "3s": ["3s", "3s", "3s"],
    "4s": ["4s", "4s", "4s"],
    "5s": ["5s", "5s", "5s"],
    "6s": ["6s", "6s", "6s"],
    "7s": ["7s", "7s", "7s"],
    "8s": ["8s", "8s", "8s"],
    "9s": ["9s", "9s", "9s"],
    "1z": ["1z", "1z", "1z"],
    "2z": ["2z", "2z", "2z"],
    "3z": ["3z", "3z", "3z"],
    "4z": ["4z", "4z", "4z"],
    "5z": ["5z", "5z", "5z"],
    "6z": ["6z", "6z", "6z"],
    "7z": ["7z", "7z", "7z"],
    "0x": ["0x", "0x", "0x"],
};

export const KANTSU: Record<tilename, tilename[]> = {
    "0m": ["0m", "5m", "5m", "5m"],
    "1m": ["1m", "1m", "1m", "1m"],
    "2m": ["2m", "2m", "2m", "2m"],
    "3m": ["3m", "3m", "3m", "3m"],
    "4m": ["4m", "4m", "4m", "4m"],
    "5m": ["5m", "5m", "5m", "0m"],
    "6m": ["6m", "6m", "6m", "6m"],
    "7m": ["7m", "7m", "7m", "7m"],
    "8m": ["8m", "8m", "8m", "8m"],
    "9m": ["9m", "9m", "9m", "9m"],
    "0p": ["0p", "5p", "5p", "5p"],
    "1p": ["1p", "1p", "1p", "1p"],
    "2p": ["2p", "2p", "2p", "2p"],
    "3p": ["3p", "3p", "3p", "3p"],
    "4p": ["4p", "4p", "4p", "4p"],
    "5p": ["5p", "5p", "5p", "0p"],
    "6p": ["6p", "6p", "6p", "6p"],
    "7p": ["7p", "7p", "7p", "7p"],
    "8p": ["8p", "8p", "8p", "8p"],
    "9p": ["9p", "9p", "9p", "9p"],
    "0s": ["0s", "5s", "5s", "5s"],
    "1s": ["1s", "1s", "1s", "1s"],
    "2s": ["2s", "2s", "2s", "2s"],
    "3s": ["3s", "3s", "3s", "3s"],
    "4s": ["4s", "4s", "4s", "4s"],
    "5s": ["5s", "5s", "5s", "0s"],
    "6s": ["6s", "6s", "6s", "6s"],
    "7s": ["7s", "7s", "7s", "7s"],
    "8s": ["8s", "8s", "8s", "8s"],
    "9s": ["9s", "9s", "9s", "9s"],
    "1z": ["1z", "1z", "1z", "1z"],
    "2z": ["2z", "2z", "2z", "2z"],
    "3z": ["3z", "3z", "3z", "3z"],
    "4z": ["4z", "4z", "4z", "4z"],
    "5z": ["5z", "5z", "5z", "5z"],
    "6z": ["6z", "6z", "6z", "6z"],
    "7z": ["7z", "7z", "7z", "7z"],
    "0x": ["0x", "0x", "0x", "0x"],
};

export const TOITSU: Record<tilename, tilename[]> = {
    "0m": ["0m", "5m"],
    "1m": ["1m", "1m"],
    "2m": ["2m", "2m"],
    "3m": ["3m", "3m"],
    "4m": ["4m", "4m"],
    "5m": ["5m", "5m"],
    "6m": ["6m", "6m"],
    "7m": ["7m", "7m"],
    "8m": ["8m", "8m"],
    "9m": ["9m", "9m"],
    "0p": ["0p", "5p"],
    "1p": ["1p", "1p"],
    "2p": ["2p", "2p"],
    "3p": ["3p", "3p"],
    "4p": ["4p", "4p"],
    "5p": ["5p", "5p"],
    "6p": ["6p", "6p"],
    "7p": ["7p", "7p"],
    "8p": ["8p", "8p"],
    "9p": ["9p", "9p"],
    "0s": ["0s", "5s"],
    "1s": ["1s", "1s"],
    "2s": ["2s", "2s"],
    "3s": ["3s", "3s"],
    "4s": ["4s", "4s"],
    "5s": ["5s", "5s"],
    "6s": ["6s", "6s"],
    "7s": ["7s", "7s"],
    "8s": ["8s", "8s"],
    "9s": ["9s", "9s"],
    "1z": ["1z", "1z"],
    "2z": ["2z", "2z"],
    "3z": ["3z", "3z"],
    "4z": ["4z", "4z"],
    "5z": ["5z", "5z"],
    "6z": ["6z", "6z"],
    "7z": ["7z", "7z"],
    "0x": ["0x", "0x"],
};
