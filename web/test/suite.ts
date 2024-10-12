export function page_html_of_test_js(import_meta: ImportMeta) {
    return to_page_html(new URL(import_meta.url).pathname);
}

export function to_page_html(test_js: string) {
    return test_js.replace('test-', '').replace('.js', '.html');
}

export function suite(path: string): string {
    const s = 'web/';
    return path.substring(path.indexOf(s) + s.length);
}

// UNUSED

function page_html_of_test_script(pathname: string) {
    const test_js = pathname.substring(pathname.indexOf('/', 1) + 1);
    return to_page_html(test_js);
}

function app_pathname_segment(pathname: string) {
    return pathname.substring(0, pathname.indexOf('/', 1));
}
