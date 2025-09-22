import * as chai from "chai";
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
        function findCheckbox(text: string, parent: Element): HTMLInputElement {
            const li = CT.spot(text, parent, {selectors: 'li'}) as HTMLLIElement;
            return CT.querySelector("input", li);
        }

        it('looks good', async function () {
            this.retries(64);
            const parent = CT.querySelector('expressions-boolean-recipe', window);
            const input1 = findCheckbox("checked and enabled", parent);
            chai.assert(input1.checked);
            chai.assert(!input1.disabled);
            const input2 = findCheckbox("checked and disabled", parent);
            chai.assert(input2.checked);
            chai.assert(input2.disabled);
            const input3 = findCheckbox("unchecked and enabled", parent);
            chai.assert(!input3.checked);
            chai.assert(!input3.disabled);
            const input4 = findCheckbox("unchecked and disabled", parent);
            chai.assert(!input4.checked);
            chai.assert(input4.disabled);
        });
    });
});
