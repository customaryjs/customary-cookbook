import 'mocha';
import * as CT from "#customary-testing";
import {test_suite} from "../../test/suite.js";

const suite = test_suite(import.meta);

describe(suite.title, async function (){
    this.timeout(4000);
    this.slow(500);

    let window: Window;

    before(() => window = CT.open(suite.subject_html));
    after(() => window.close());

    describe('happy day', async function () {
        let el: Element, elA: HTMLLIElement, elB: HTMLLIElement;
        const a = 'Spinach', b = 'Blueberry';
        it('looks good', async function () {
            this.retries(128);
            el = CT.querySelector('expressions-property-recipe', window);
            elA = CT.spot(a, el, {selectors: 'li'}).parentElement as HTMLLIElement;
            elB = CT.spot(b, el, {selectors: 'li'}).parentElement as HTMLLIElement;
        });
        it('interact', async function () {
            (CT.querySelector('button', elA) as HTMLButtonElement).click();
            (CT.querySelector('button', elB) as HTMLButtonElement).click();
        });
        it('looks good', async function () {
            this.retries(128);
            CT.spot(`${a} ${b}`, el, {selectors: '.basket'});
        });
    });
});
