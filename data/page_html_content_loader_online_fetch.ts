import {PageHtmlContentLoader} from "./page_html_content_loader.js";

export class PageHtmlContentLoaderOnlineFetch implements PageHtmlContentLoader {
    async load_page_content(page_html: string): Promise<string> {
        const location = '../' + page_html;
        const response = await fetch(import.meta.resolve(location));
        return await response.text();
    }
}