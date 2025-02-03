export const _manzu = ["0m", "1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m"] as const;
export const _pinzu = ["0p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p"] as const;
export const _souzu = ["0s", "1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s"] as const;
export const _kaze = ["1z", "2z", "3z", "4z"] as const;
export const _sangen = ["5z", "6z", "7z"] as const;
export const _shupai = [..._manzu, ..._pinzu, ..._souzu] as const;
export const _zihai = [..._kaze, ..._sangen] as const;
export const _ura = ["0x"] as const;

export const _tiles = [..._shupai, ..._zihai, ..._ura] as const;

export type tilest = (typeof _tiles)[number];
export type manzut = (typeof _manzu)[number];
export type pinzut = (typeof _pinzu)[number];
export type souzut = (typeof _souzu)[number];
export type kazet = (typeof _kaze)[number];
export type sangent = (typeof _sangen)[number];
export type shupait = (typeof _shupai)[number];
export type zihait = (typeof _zihai)[number];
export type urat = (typeof _ura)[number];

export const _yaochuu: tilest[] = ["1m", "9m", "1p", "9p", "1s", "9s", ..._zihai] as const;

export function isTile(t: string) {
    return _tiles.includes(<tilest>t);
}
