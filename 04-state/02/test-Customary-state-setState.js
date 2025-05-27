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
        let container;
        function assert_element() {
            container = CT.querySelector('recipe-card', window);
        }
        function assert_textContent(textContent) {
            CT.spot(textContent, container, { selectors: 'div.c > div' });
        }
        it('looks good', async function () {
            this.retries(64);
            assert_element();
            assert_textContent("02-state/02/test-Customary-state-setState.ts");
        });
        it('interact', async function () {
            CT.querySelector('button', container).click();
        });
        it('looks good', async function () {
            this.retries(16);
            assert_textContent("Hello Customary !");
        });
    });
});
//# sourceMappingURL=test-Customary-state-setState.js.map