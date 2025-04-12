import 'mocha';
import { CustomaryTestingQueries } from "#customary-testing";
import { test_suite } from "../../test/suite.js";
const suite = test_suite(import.meta);
describe(suite.title, async function () {
    this.timeout(4000);
    this.slow(500);
    let window;
    before(() => window = globalThis.window.open(suite.subject_html));
    after(() => window.close());
    describe('happy day', async function () {
        let container;
        function assert_element() {
            container = window.document.querySelector('recipe-card').shadowRoot;
        }
        function assert_textContent(textContent) {
            CustomaryTestingQueries.findByTextContent(container, textContent, { selector: 'div.c > div' });
        }
        it('looks good', async function () {
            this.retries(64);
            assert_element();
            assert_textContent("");
        });
        it('interact', async function () {
            container.querySelector('button').click();
        });
        it('looks good', async function () {
            this.retries(16);
            assert_textContent("02-state/04/test-Customary-state-blank.ts");
        });
    });
});
//# sourceMappingURL=test-Customary-state-blank.js.map