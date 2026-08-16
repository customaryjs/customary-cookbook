import 'mocha';
import * as CT from "#customary-testing";
import {test_suite} from "../../test/suite.js";
import * as chai from "chai";

const suite = test_suite(import.meta);

describe(suite.title, async function () {
    this.timeout(4000);
    this.slow(500);

    let window: Window;

    before(() => window = CT.open(suite.subject_html));
    after(() => window.close());

    describe('happy day', async function () {
        let sender_with_shadow_root: Element;
        let sender_with_shadow_root_composed: Element;
        let sender_without_shadow_root: Element;

        it('a sender in each fieldset', async function () {
            this.retries(64);
            const element = CT.querySelector('events-form-recipe', window);
            sender_with_shadow_root = CT.querySelector('events-form-sender',
                CT.querySelector('events-form-shadow-root', element));
            sender_with_shadow_root_composed = CT.querySelector('events-form-sender',
                CT.querySelector('events-form-shadow-root-composed', element));
            sender_without_shadow_root = CT.querySelector('events-form-sender',
                CT.querySelector('events-form-no-shadow-root', element));
        });

        it('submit every form', async function () {
            this.retries(64);
            (CT.querySelector('button', sender_with_shadow_root) as HTMLButtonElement).click();
            (CT.querySelector('button', sender_with_shadow_root_composed) as HTMLButtonElement).click();
            (CT.querySelector('button', sender_without_shadow_root) as HTMLButtonElement).click();
        });

        it('the shadowRoot keeps the submit event to itself', async function () {
            this.retries(64);
            chai.assert.strictEqual(
                CT.allTextContent(CT.querySelector('span.outcome', sender_with_shadow_root)),
                '',
                'a submit event is not composed, so it must not escape the shadowRoot'
            );
        });

        it('a composed custom event crosses the same shadowRoot', async function () {
            this.retries(64);
            CT.spot('{"type":"my_custom_submit","bubbles":true,"composed":true,' +
                '"detail":{"original_event":{"type":"submit","bubbles":true,"composed":false}}}',
                sender_with_shadow_root_composed);
        });

        it('without a shadowRoot the submit event comes through', async function () {
            this.retries(64);
            CT.spot('{"type":"submit","bubbles":true,"composed":false}',
                sender_without_shadow_root);
        });
    });
});
