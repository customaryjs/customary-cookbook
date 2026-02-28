import 'mocha';
import * as CT from "#customary-testing";
import { test_suite } from "../../test/suite.js";
import { assert } from "chai";
const suite = test_suite(import.meta);
describe(suite.title, async function () {
    this.timeout(4000);
    this.slow(500);
    let window;
    let element;
    let evidence;
    before(() => window = CT.open(suite.subject_html));
    after(() => window.close());
    describe('happy day', async function () {
        function assert_evidence(expected) {
            const option = CT.querySelector(`option[value="${expected.charAt(0)}"]`, evidence);
            assert.equal(CT.allTextContent(option), expected);
        }
        it('looks good', async function () {
            this.retries(64);
            element = CT.querySelector('logic-inside-recipe', window);
            evidence = CT.querySelector('select', element);
            assert_evidence("0: Peas");
            assert_evidence("1: Carrots");
            assert_evidence("2: Tomatoes");
        });
    });
});
//# sourceMappingURL=test-Customary-logic-inside.js.map