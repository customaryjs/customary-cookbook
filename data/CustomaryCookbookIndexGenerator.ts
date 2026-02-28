import {readdirSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {PageHtmlContentLoaderLocalFile} from "./page_html_content_loader_local_file.js";
import {customary_cookbook_index_json_local_write} from "./customary_cookbook_index_json_local_write.js";
import {PageHtmlContentLoader} from "./page_html_content_loader.js";
import {Recipe} from "./CustomaryCookbookIndex";

export class CustomaryCookbookIndexGenerator {
    static async generateResource() {
        const src_dir = fileURLToPath(new URL('..', import.meta.url));

        const test_ts_file_name_pattern = /^\d+-.+\/\d+\/test-.+\.ts$/;

        const tests: string[] = (readdirSync(src_dir, {recursive: true}) as string[])
            .filter(f => test_ts_file_name_pattern.test(f));

        const content: string = await toIndexString(
            tests,
            new PageHtmlContentLoaderLocalFile()
        );

        customary_cookbook_index_json_local_write(content);
    }
}


async function toIndexString(tests: string[], page_html_content_loader: PageHtmlContentLoader): Promise<string> {
    const data_structure: Recipe[] = await Promise.all(
        tests.sort().map(line=>to_entry(line, page_html_content_loader))
    );
    return JSON.stringify(data_structure, undefined, 2);
}

async function to_entry(test_ts: string, page_html_content_loader: PageHtmlContentLoader): Promise<Recipe> {
    const github = 'https://github.com/customaryjs/customary-cookbook';
    const github_blob_main = `${github}/blob/main/src`;
    const github_tree_main = `${github}/tree/main/src`;

    const page_html = test_ts_to_page_html(test_ts);
    const dir = test_ts_to_dir(test_ts);

    const page_content = await page_html_content_loader.load_page_content(page_html);
    const fc = from_content(page_content);
    const {chapter_name, recipe_name} = fc ?? {};

    return {
        id: test_ts_to_id(test_ts),
        chapter_name: chapter_name ?? page_html,
        ...(recipe_name ? {recipe_name} : {}),
        page_html,
        test_ts,
        test_js: test_ts_to_test_js(test_ts),
        github_page_html: `${github_blob_main}/${page_html}`,
        github_dir: `${github_tree_main}/${dir}`,
    };
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
    const recipe_name = i2 < 0 ? '' : title.substring(i1 + de.length, i2);

    if (recipe_name && !content.includes(recipe_name, i2)) {
        throw new Error(`Must update title to include the recipe name: ${recipe_name}`);
    }

    return {chapter_name, recipe_name};
}
