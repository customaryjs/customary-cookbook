import * as chai from "chai";
import 'mocha';
import * as CT from "#customary-testing";
import { test_suite } from "../../test/suite.js";
const suite = test_suite(import.meta);
describe(suite.title, async function () {
    this.timeout(4000);
    this.slow(500);
    let window;
    let element;
    let textarea;
    before(() => window = CT.open(suite.subject_html));
    after(() => window.close());
    describe('happy day', async function () {
        function spot_binding_output(expected) {
            CT.spot(expected, element, { selectors: 'pre' });
        }
        it('looks good', async function () {
            this.retries(128);
            element = CT.querySelector('bindings-textarea-recipe', window);
            spot_binding_output("Hello Customary !");
        });
        it('interact', async function () {
            textarea = CT.querySelector('textarea', element);
            CT.textarea('!!', textarea);
        });
        it('looks good', async function () {
            this.retries(64);
            spot_binding_output("Hello Customary !!!");
            chai.assert.equal(CT.activeElement(element), textarea);
        });
    });
});
//# sourceMappingURL=test-Customary-bindings-textarea.js.map