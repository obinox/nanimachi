export type rdonly<K extends string | number | symbol, V> = {
    readonly [x in K]: V;
};
// typescript/lib/lib.es5.d.ts
