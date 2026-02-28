import {PageHtmlContentLoader} from "./page_html_content_loader.js";
import {readFileSync} from "node:fs";

export class PageHtmlContentLoaderLocalFile implements PageHtmlContentLoader {
    async load_page_content(page_html: string): Promise<string> {
        const location = '../' + page_html;
        return readFileSync(new URL(location, import.meta.url), 'utf-8');
    }
}