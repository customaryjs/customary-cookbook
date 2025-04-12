export function test_suite(import_meta) {
    const test_js = new URL(import_meta.url).pathname;
    const subject_html = test_js.replace('test-', '').replace('.js', '.html');
    const location_html = document.location.pathname;
    const title = subject_html.substring(location_html.indexOf('test'));
    return {
        subject_html,
        title,
    };
}
//# sourceMappingURL=suite.js.map