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
            this.retries(32);
            const element = CT.querySelector(
                `attributes-composed[call='Are we composed now?']`, window);
            CT.spot('Are we composed now?', element, {selectors: 'h1'});
            const firstElementChild = element.firstElementChild!;
            CT.spot('Yes, yes we are.', firstElementChild, {selectors: 'i'});
        });
    });
});
