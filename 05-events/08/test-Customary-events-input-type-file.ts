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
        let element: Element;
        let picker1: Element;
        let picker2: Element;
        let picker3: Element;
        let picker4: Element;

        it('looks good', async function () {
            this.retries(64);
            element = CT.querySelector('events-input-file-recipe', window);
            const shadowRootElement = CT.querySelector('events-input-file-shadow-root', element);
            picker1 = CT.querySelector('.with-change-event', shadowRootElement);
            picker2 = CT.querySelector('.with-input-event', shadowRootElement);
            const noShadowRootElement = CT.querySelector('events-input-file-no-shadow-root', element);
            picker3 = CT.querySelector('.with-change-event', noShadowRootElement);
            picker4 = CT.querySelector('.with-input-event', noShadowRootElement);
        });

        it('interact', async function () {
            this.retries(64);
            (CT.querySelector('button', picker1) as HTMLButtonElement).click();
            (CT.querySelector('button', picker2) as HTMLButtonElement).click();
            (CT.querySelector('button', picker3) as HTMLButtonElement).click();
            (CT.querySelector('button', picker4) as HTMLButtonElement).click();
        });

        it('looks good', async function () {
            this.retries(64);
            CT.spot('', picker1, {selectors: 'span.outcome'});
            CT.spot('.gitconfig {"type":"input","bubbles":true,"composed":true}', picker2);
            CT.spot('.gitconfig {"type":"change","bubbles":true,"composed":false}', picker3);
            CT.spot('.gitconfig {"type":"input","bubbles":true,"composed":true}', picker4);
        });
    });
});
