export class PageHtmlContentLoaderOnlineFetch {
    async load_page_content(page_html) {
        const location = '../' + page_html;
        const response = await fetch(import.meta.resolve(location));
        return await response.text();
    }
}
//# sourceMappingURL=page_html_content_loader_online_fetch.js.map