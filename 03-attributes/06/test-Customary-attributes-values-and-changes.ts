import {assert} from "chai";
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
        it('changes hook receives setAttribute value', async function () {
            this.retries(128);
            const element = CT.querySelector('attributes-values-and-changes', window);
            CT.spot('Customary', element, {selectors: 'h1'});
        });
    });
});
