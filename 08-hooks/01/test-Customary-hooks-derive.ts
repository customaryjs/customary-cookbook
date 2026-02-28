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
            this.retries(128);
            const element = CT.querySelector('hooks-derive-recipe', window);
            const greeting: HTMLElement = CT.querySelector('.greeting', element);
            const shout: HTMLElement = CT.querySelector('.shout', element);

            chai.assert.equal(greeting.textContent, 'Hello, Customary!');
            chai.assert.equal(shout.textContent, 'HELLO, CUSTOMARY!');
        });
    });
});
