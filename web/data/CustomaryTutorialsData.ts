import {FetchText_DOM_singleton} from "customary/fetch/FetchText.js";

export class CustomaryTutorialsData {
    static async loadData(basePath: string): Promise<Data> {
        const fetchText = FetchText_DOM_singleton;
        const location = './tests.txt';
        const text = await fetchText.fetchText(import.meta.resolve(location));
        const lines = text.split('\n')
            .map(s=>s.trim()
            .replace('web/', basePath))
            .filter(s=>s.length>0);

        const tests = lines;
        const pages = lines.map(s=>s.replace('test-', '').replace('.js', '.html'));
        return {tests, pages};
    }
}

export type Data = {
    pages: string[];
    tests: string[];
}
