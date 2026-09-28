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
            const element = CT.querySelector('favicon-both-recipe', window);
            CT.spot("Open this recipe in a new tab and look at its icon.", element, { selectors: 'p' });
        });
        it('links both favicons, svg first', async function () {
            this.retries(128);
            const links = CT.querySelectorAll('link[rel="icon"]', window);
            chai.assert.lengthOf(links, 2);
            chai.assert.match(links[0].href, /\/11-favicon\/04\/favicon\.svg$/);
            chai.assert.strictEqual(links[0].type, 'image/svg+xml');
            chai.assert.match(links[1].href, /\/11-favicon\/04\/favicon\.ico$/);
            chai.assert.strictEqual(links[1].type, 'image/x-icon');
        });
    });
});
//# sourceMappingURL=test-Customary-favicon-both.js.map