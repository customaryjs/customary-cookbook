import {FetchText_DOM_singleton} from "customary/fetch/FetchText.js";

export class CustomaryTutorialsData {
    static async generateData() {
        const fetchText = FetchText_DOM_singleton;
        const location = './tests.txt';
        const text = await fetchText.fetchText(import.meta.resolve(location));
        const lines = text.split('\n')
            .map(s=>s.trim()
                .replace('web/', ''))
            .filter(s=>s.length>0);
        const tutorials: Tutorial[] = [];
        for (const line of lines) {
            tutorials.push(await to_tutorial(line));
        }
        return tutorials;
    }

    static async loadData(): Promise<Data> {
        const fetchText = FetchText_DOM_singleton;
        const location = './customary-tutorials-data.json';
        const text = await fetchText.fetchText(import.meta.resolve(location));
        return new Data(JSON.parse(text));
    }
}

async function to_tutorial(s: string): Promise<Tutorial> {
    const github = 'https://github.com/arboliveira/customary-tutorials';
    const github_blob_main = `${github}/blob/main/web`;
    const github_tree_main = `${github}/tree/main/web`;

    const page_html = test_ts_to_page_html(s);
    const dir = test_ts_to_dir(s);

    const page_content = await load_page_content(page_html);
    const fc = from_content(page_content);
    const {chapter_name, tutorial_name} = fc ?? {};

    return {
        id: test_ts_to_id(s),
        chapter_name: chapter_name ?? page_html,
        ...(tutorial_name ? {tutorial_name} : {}),
        page_html,
        test_js: test_ts_to_test_js(s),
        github_page_html: `${github_blob_main}/${page_html}`,
        github_dir: `${github_tree_main}/${dir}`,
    };
}

export type Tutorial = {
    id: string;
    chapter_name: string;
    tutorial_name?: string;
    page_html: string;
    test_js: string;
    github_page_html: string;
    github_dir: string;
}

export type NavigationData = Tutorial & {
    previous_id?: string;
    previous_name?: string;
    next_id?: string;
    next_name?: string;
}

export class Data {
    constructor(readonly tutorials: Array<Tutorial>) {}

    getNavigationData(id: string): NavigationData | undefined {
        const i = this.tutorials.findIndex(t => t.id === id);
        if (i < 0) return undefined;
        const tutorial = this.tutorials[i];
        const previous = this.tutorials[i-1];
        const next = this.tutorials[i+1];
        const d = '~';
        const next_tutorial_name = next?.tutorial_name ? ` ${d} ${next.tutorial_name}` : '';
        const next_name = next ? `${next.chapter_name}${next_tutorial_name}` : undefined;
        const previous_tutorial_name = previous?.tutorial_name ? ` ${d} ${previous.tutorial_name}` : '';
        const previous_name = previous ? `${previous.chapter_name}${previous_tutorial_name}` : undefined;
        return {
            ...tutorial,
            ...(previous_name ? {previous_name} : {}),
            ...(previous ? {previous_id: previous.id} : {}),
            ...(next_name ? {next_name} : {}),
            ...(next ? {next_id: next.id} : {}),
        };
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

async function load_page_content(page_html: string) {
    return await FetchText_DOM_singleton.fetchText(
        import.meta.resolve('../' + page_html));
}

function from_content(content: string) {
    const op = '<title>';
    const cl = '</title>';
    const i = content.indexOf(op);
    if (i < 0) return undefined;
    const title = content.substring(i + op.length, content.indexOf(cl));

    const de = ' ~ ';
    const i1 = title.indexOf(de);
    const i2 = title.indexOf(de, i1 + 1);
    const chapter_name = title.substring(0, i1);
    const tutorial_name = i2 < 0 ? '' : title.substring(i1 + de.length, i2);

    if (tutorial_name && !content.includes(tutorial_name, i2)) {
        throw new Error(tutorial_name);
    }

    return {chapter_name, tutorial_name};
}
