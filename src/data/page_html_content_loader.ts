export interface PageHtmlContentLoader {
    load_page_content(page_html: string): Promise<string>;
}
