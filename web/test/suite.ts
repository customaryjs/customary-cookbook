export function suite(path: string): string {
    const s = 'web/';
    return path.substring(path.indexOf(s) + s.length);
}
