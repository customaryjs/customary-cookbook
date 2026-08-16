import 'mocha';
import * as CT from "#customary-testing";
import { test_suite } from "../../test/suite.js";
import * as chai from "chai";
const suite = test_suite(import.meta);
describe(suite.title, async function () {
    this.timeout(4000);
    this.slow(500);
    let window;
    before(() => window = CT.open(suite.subject_html));
    after(() => window.close());
    describe('happy day', async function () {
        let silent;
        let heard;
        let announcing_form;
        it('a form in each fieldset', async function () {
            this.retries(64);
            const element = CT.querySelector('events-announcing-recipe', window);
            silent = CT.querySelector('events-announcing-silent', element);
            heard = CT.querySelector('events-announcing-heard', element);
            announcing_form = CT.querySelector('events-announcing-form', heard);
        });
        it('submit both forms', async function () {
            this.retries(64);
            CT.querySelector('button', silent).click();
            CT.querySelector('button', announcing_form).click();
        });
        it('the shadowRoot keeps the submit event to itself', async function () {
            this.retries(64);
            chai.assert.strictEqual(CT.allTextContent(CT.querySelector('span.outcome', silent)), '', 'a submit event is not composed, so it must not escape the shadowRoot');
        });
        it('a self-announcing form is heard across the shadowRoot', async function () {
            this.retries(64);
            CT.spot('{"type":"custom_submit","bubbles":true,"composed":true,' +
                '"detail":{"original_event":{"type":"submit","bubbles":true,"composed":false}}}', heard);
        });
    });
});
//# sourceMappingURL=test-Customary-events-form-self-announcing.js.map