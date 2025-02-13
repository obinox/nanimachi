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

export function subtract<T>(s: T[], a: T[]) {
    if (!isSubset(s, a)) {
        return [...s];
    }
    const out = [...s];
    for (const e of a) {
        out.splice(out.indexOf(e), 1);
    }
    return out;
}

export function delDups<T>(arr: T[], cond: (e: T) => T | string | number = (e) => JSON.stringify(e)): T[] {
    const set: Set<T | string | number> = new Set();
    const out: T[] = [];
    for (const e of arr) {
        const c = cond(e);
        if (!set.has(c)) {
            set.add(c);
            out.push(e);
        }
    }
    return out;
}

export function hasDups<T>(arr: T[], cond: (e: T) => T | string | number = (e) => JSON.stringify(e)): boolean {
    const set = new Set<T | string | number>();
    for (const e of arr) {
        const c = cond(e);
        if (set.has(c)) {
            return true;
        }
        set.add(c);
    }
    return false;
}

export function matDups<T>(arr: T[], cond: (e: T) => T | string | number = (e) => JSON.stringify(e)): T[] {
    const map = new Map<T | string | number, number>();
    const out: T[] = [];
    for (const e of arr) {
        const c = cond(e);
        if (!map.has(c)) {
            out.push(e);
        }
        map.set(c, (map.get(c) ?? 0) + 1);
    }
    return out.filter((e) => (map.get(cond(e)) ?? 0) % 2 !== 0);
}
