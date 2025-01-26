export function vtok<T, K>(r: Record<string, T>, v: T) {
    for (const k in r) {
        if (JSON.stringify(r[k]) == JSON.stringify(v)) {
            return <K>k;
        }
    }
    return <K>undefined;
}
