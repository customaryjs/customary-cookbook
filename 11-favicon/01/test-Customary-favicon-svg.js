import * as chai from "chai";
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
            const element = CT.querySelector('favicon-svg-recipe', window);
            CT.spot("Open this recipe in a new tab and look at its icon.", element, { selectors: 'p' });
        });
        it('links the favicon', async function () {
            this.retries(128);
            const links = CT.querySelectorAll('link[rel="icon"]', window);
            chai.assert.lengthOf(links, 1);
            chai.assert.match(links[0].href, /\/11-favicon\/01\/favicon\.svg$/);
            chai.assert.strictEqual(links[0].type, 'image/svg+xml');
        });
    });
});
//# sourceMappingURL=test-Customary-favicon-svg.js.map