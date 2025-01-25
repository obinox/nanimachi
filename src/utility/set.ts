export function isSubset<T>(s: T[], a: T[]): boolean {
    const scnt = new Map<T, number>();
    const acnt = new Map<T, number>();

    s.forEach((element) => {
        scnt.set(element, (scnt.get(element) || 0) + 1);
    });

    a.forEach((element) => {
        acnt.set(element, (acnt.get(element) || 0) + 1);
    });

    for (const [e, ca] of acnt) {
        const cs = scnt.get(e) || 0;
        if (ca > cs) {
            return false;
        }
    }

    return true;
}
