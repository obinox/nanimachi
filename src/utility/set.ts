export function isSubset<T>(s: T[], a: T[]): boolean {
    const scnt = new Map<T, number>();
    const acnt = new Map<T, number>();

    for (const e of s) {
        scnt.set(e, (scnt.get(e) || 0) + 1);
    }
    for (const e of a) {
        acnt.set(e, (acnt.get(e) || 0) + 1);
    }

    for (const [e, ca] of acnt) {
        const cs = scnt.get(e) || 0;
        if (ca > cs) {
            return false;
        }
    }

    return true;
}
