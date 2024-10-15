import {FetchText_DOM_singleton} from "customary/fetch/FetchText.js";

export class CustomaryTutorialsData {
    static async loadData(): Promise<Data> {
        const fetchText = FetchText_DOM_singleton;
        const location = './tests.txt';
        const text = await fetchText.fetchText(import.meta.resolve(location));
        const lines = text.split('\n')
            .map(s=>s.trim()
            .replace('web/', ''))
            .filter(s=>s.length>0);

        const tutorials: Tutorial[] = lines.map<Tutorial>(s => {
            const github = 'https://github.com/arboliveira/customary-tutorials';
            const github_blob_main = `${github}/blob/main/web`;
            const github_tree_main = `${github}/tree/main/web`;

            const page_html = test_ts_to_page_html(s);
            const dir = test_ts_to_dir(s);

            return ({
                test_js: test_ts_to_test_js(s),
                page_html,
                github_page_html: `${github_blob_main}/${page_html}`,
                github_dir: `${github_tree_main}/${dir}`,
                name: '<PLACEHOLDER>',
                id: test_ts_to_id(s),
            });
        });
        return new Data(tutorials);
    }
}

export type Tutorial = {
    id: string;
    name: string;
    page_html: string;
    test_js: string;
    github_page_html: string;
    github_dir: string;
}

export class Data {
    constructor(readonly tutorials: Array<Tutorial>) {}

    findById(id: string): Tutorial | undefined {
        return this.tutorials.find(t => t.id === id);
    }

    get pages(): string[] {
        return this.tutorials.map(t => t.page_html);
    }

    get tests(): string[] {
        return this.tutorials.map(t => t.test_js);
    }
}

function test_ts_to_test_js(s: string) {
    return s.replace('.ts', '.js');
}

function test_ts_to_page_html(s: string) {
    return s.replace('test-', '').replace('.ts', '.html');
}

function test_ts_to_id(s: string) {
    const slash1 = s.indexOf('/');
    const slash2 = s.indexOf('/', slash1 + 1);
    const s1 = s.substring(0, s.indexOf('-') + 1);
    const s2 = s.substring(slash1 + 1, slash2);
    return s1 + s2;
}

function test_ts_to_dir(s: string) {
    const slash1 = s.indexOf('/');
    const slash2 = s.indexOf('/', slash1 + 1);
    return s.substring(0, slash2);
}
