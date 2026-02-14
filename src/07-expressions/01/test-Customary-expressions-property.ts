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
        it('looks good', async function () {
            this.retries(128);
            for (const s of ["0: 4", "1: 8", "2: 15", "3: 16", "4: 23", "5: 42"]) {
                const parent = CT.querySelector('expressions-property-recipe', window);
                const container = CT.querySelector('expressions-property-recipe-child', parent);
                CT.spot(s, container, {selectors: 'li'});
            }
        });
    });
});
