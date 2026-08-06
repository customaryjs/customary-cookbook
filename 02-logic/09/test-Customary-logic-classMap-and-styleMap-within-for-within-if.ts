import 'mocha';
import * as CT from "#customary-testing";
import {test_suite} from "../../test/suite.js";
import * as chai from "chai";

const suite = test_suite(import.meta);

describe(suite.title, async function (){
    this.timeout(4000);
    this.slow(500);

    let window: Window;

    before(async () => window = await CT.open(suite.subject_html));
    after(() => window.close());

    describe('happy day', async function () {
        it('looks good', async function () {
            this.retries(64);
            const element = CT.querySelector(
                'logic-classmap-and-stylemap-within-for-within-if-recipe', window);

            CT.spot('Water the plants', element, {selectors: 'span'});
            CT.spot('Sweep the floor', element, {selectors: 'span'});

            const span: HTMLElement = CT.querySelector('span', element);
            chai.assert.isTrue(span.classList.contains('done'));
            chai.assert.strictEqual(span.style.color, 'green');
        });
    });
});
