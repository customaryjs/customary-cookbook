import { readFileSync } from "node:fs";
export class PageHtmlContentLoaderLocalFile {
    async load_page_content(page_html) {
        const location = '../' + page_html;
        return readFileSync(new URL(location, import.meta.url), 'utf-8');
    }
}
//# sourceMappingURL=page_html_content_loader_local_file.js.map