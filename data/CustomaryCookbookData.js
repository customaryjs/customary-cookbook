export class CustomaryCookbookData {
    static async generateData() {
        const location = './tests.txt';
        const response = await fetch(import.meta.resolve(location));
        const text = await response.text();
        const lines = text.split('\n')
            .map(s => s.trim().replace('src/', ''))
            .filter(s => s.length);
        return await Promise.all(lines.map(line => to_entry(line)));
    }
    static async loadData() {
        const location = './customary-cookbook-data.json';
        const response = await fetch(import.meta.resolve(location));
        const json = await response.json();
        return new Data(json);
    }
}
async function to_entry(test_ts) {
    const github = 'https://github.com/customaryjs/customary-cookbook';
    const github_blob_main = `${github}/blob/main/src`;
    const github_tree_main = `${github}/tree/main/src`;
    const page_html = test_ts_to_page_html(test_ts);
    const dir = test_ts_to_dir(test_ts);
    const page_content = await load_page_content(page_html);
    const fc = from_content(page_content);
    const { chapter_name, recipe_name } = fc ?? {};
    return {
        id: test_ts_to_id(test_ts),
        chapter_name: chapter_name ?? page_html,
        ...(recipe_name ? { recipe_name } : {}),
        page_html,
        test_ts,
        test_js: test_ts_to_test_js(test_ts),
        github_page_html: `${github_blob_main}/${page_html}`,
        github_dir: `${github_tree_main}/${dir}`,
    };
}
export class Data {
    constructor(items) {
        this.items = items;
    }
    getNavigationData(id) {
        const i = this.items.findIndex(t => t.id === id);
        if (i < 0)
            return undefined;
        const item = this.items[i];
        const previous = this.items[i - 1];
        const next = this.items[i + 1];
        const d = '~';
        const next_item_name = next?.recipe_name ? ` ${d} ${next.recipe_name}` : '';
        const next_name = next ? `${next.chapter_name}${next_item_name}` : undefined;
        const previous_item_name = previous?.recipe_name ? ` ${d} ${previous.recipe_name}` : '';
        const previous_name = previous ? `${previous.chapter_name}${previous_item_name}` : undefined;
        return {
            ...item,
            ...(previous_name ? { previous_name } : {}),
            ...(previous ? { previous_id: previous.id } : {}),
            ...(next_name ? { next_name } : {}),
            ...(next ? { next_id: next.id } : {}),
        };
    }
    get pages() {
        return this.items.map(t => t.page_html);
    }
    get tests() {
        return this.items.map(t => t.test_js);
    }
}
function test_ts_to_test_js(s) {
    return s.replace('.ts', '.js');
}
function test_ts_to_page_html(s) {
    return s.replace('test-', '').replace('.ts', '.html');
}
function test_ts_to_id(s) {
    const slash1 = s.indexOf('/');
    const slash2 = s.indexOf('/', slash1 + 1);
    const s1 = s.substring(0, s.indexOf('-') + 1);
    const s2 = s.substring(slash1 + 1, slash2);
    return s1 + s2;
}
function test_ts_to_dir(s) {
    const slash1 = s.indexOf('/');
    const slash2 = s.indexOf('/', slash1 + 1);
    return s.substring(0, slash2);
}
async function load_page_content(page_html) {
    const location = '../' + page_html;
    const response = await fetch(import.meta.resolve(location));
    return await response.text();
}
function from_content(content) {
    const op = '<title>';
    const cl = '</title>';
    const i = content.indexOf(op);
    if (i < 0)
        return undefined;
    const title = content.substring(i + op.length, content.indexOf(cl));
    const de = ' ~ ';
    const i1 = title.indexOf(de);
    const i2 = title.indexOf(de, i1 + 1);
    const chapter_name = title.substring(0, i1);
    const recipe_name = i2 < 0 ? '' : title.substring(i1 + de.length, i2);
    if (recipe_name && !content.includes(recipe_name, i2)) {
        throw new Error(recipe_name);
    }
    return { chapter_name, recipe_name };
}
//# sourceMappingURL=CustomaryCookbookData.js.map