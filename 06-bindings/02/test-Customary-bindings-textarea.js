import { assert } from "chai";
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
    let evidence;
    before(() => window = CT.open(suite.subject_html));
    after(() => window.close());
    describe('happy day', async function () {
        function assert_evidence(expected) {
            assert.equal(CT.allTextContent(evidence), expected);
        }
        it('looks good', async function () {
            this.retries(128);
            element = CT.querySelector('bindings-textarea', window);
            evidence = CT.querySelector('pre', element);
            assert_evidence("Hello Customary !");
        });
        it('interact', async function () {
            textarea = CT.querySelector('textarea', element);
            CT.textarea('!!', textarea);
        });
        it('looks good', async function () {
            this.retries(64);
            assert_evidence("Hello Customary !!!");
            assert.equal(element.shadowRoot.activeElement, textarea);
        });
    });
});
//# sourceMappingURL=test-Customary-bindings-textarea.js.map