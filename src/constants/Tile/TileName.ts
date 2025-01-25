export const _manzu = ["0m", "1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m"] as const;
export const _pinzu = ["0p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p"] as const;
export const _souzu = ["0s", "1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s"] as const;
export const _zihai = ["1z", "2z", "3z", "4z", "5z", "6z", "7z"] as const;
export const _ura = ["0x"] as const;

export const _tilename = [..._manzu, ..._pinzu, ..._souzu, ..._zihai, ..._ura] as const;

export type tilename = (typeof _tilename)[number];

export function isTile(t: string) {
    return _tilename.includes(<tilename>t);
}
