import 'mocha';
import * as CT from "#customary-testing";
import { test_suite } from "../../test/suite.js";
const suite = test_suite(import.meta);
describe(suite.title, async function () {
    this.timeout(4000);
    this.slow(500);
    let window;
    before(() => window = CT.open(suite.subject_html));
    after(() => window.close());
    describe('happy day', async function () {
        it('looks good', async function () {
            this.retries(128);
            const lit_styles = CT.querySelector('lit-styles-component', window);
            CT.spot("I have a shadow root. My .stripe keeps its own gold style. The page's label cannot reach me.", lit_styles, { selectors: 'p' });
            const css_file = CT.querySelector('css-file-component', window);
            CT.spot("I have a shadow root. My .stripe reads its gold style from a sibling file. The page's label cannot reach me.", css_file, { selectors: 'p' });
            const lit_styles_light = CT.querySelector('lit-styles-light-component', window);
            CT.spot('I do not have a shadow root. My Lit styles require one, so they are lost. The page paints and labels me.', lit_styles_light, { selectors: 'p' });
            const css_file_light = CT.querySelector('css-file-light-component', window);
            CT.spot('I do not have a shadow root. My sibling file underlines every .stripe on the page. The page paints and labels me right back.', css_file_light, { selectors: 'p' });
        });
    });
});
//# sourceMappingURL=test-Customary-css-lit-styles.js.map