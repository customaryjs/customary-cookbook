import { writeFileSync } from "node:fs";
export function customary_cookbook_index_json_local_write(content) {
    const location = './customary-cookbook-index.json';
    writeFileSync(new URL(location, import.meta.url), content, 'utf-8');
}
//# sourceMappingURL=customary_cookbook_index_json_local_write.js.map