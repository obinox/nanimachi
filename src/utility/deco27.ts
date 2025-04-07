export function debugtime() {
    const UUID = crypto.randomUUID();
    console.time(UUID);
    return () => console.timeEnd(UUID);
}
