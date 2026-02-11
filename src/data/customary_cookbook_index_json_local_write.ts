import {writeFileSync} from "node:fs";

export function customary_cookbook_index_json_local_write(content: string) {
    const location = './customary-cookbook-index.json';

    writeFileSync(new URL(location, import.meta.url), content, 'utf-8');
}
