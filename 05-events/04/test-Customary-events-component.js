import { assert } from "chai";
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
        let element;
        it('starts at zero', async function () {
            this.retries(128);
            element = CT.querySelector('events-component', window);
            CT.spot('Clicks: 0', element, { selectors: 'p' });
        });
        it('click Count three times', async function () {
            click('button.count');
            click('button.count');
            click('button.count');
        });
        it('tallies three', async function () {
            this.retries(64);
            CT.spot('Clicks: 3', element, { selectors: 'p' });
        });
        it('click Describe', async function () {
            click('button.describe');
        });
        it('names the event and its target', async function () {
            this.retries(64);
            CT.spot('click on button.describe', element, { selectors: 'p.description' });
        });
        it('click Reset', async function () {
            click('button.reset');
        });
        it('back to zero, description cleared', async function () {
            this.retries(64);
            CT.spot('Clicks: 0', element, { selectors: 'p' });
            assert.equal(CT.allTextContent(CT.querySelector('p.description', element)), '');
        });
        function click(selectors) {
            CT.querySelector(selectors, element).click();
        }
    });
});
//# sourceMappingURL=test-Customary-events-component.js.map