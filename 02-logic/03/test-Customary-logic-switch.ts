import 'mocha';
import {test_suite} from "../../test/suite.js";
import * as CT from "#customary-testing";

const suite = test_suite(import.meta);

describe(suite.title, async function (){
    this.timeout(4000);
    this.slow(500);

    let _window: Window;

    before(() => _window = CT.open(suite.subject_html));
    after(() => _window.close());

    describe('happy day', async function () {
        it('looks good', async function () {
            this.retries(128);
            const expected = {
                light: "Light mode",
                dark: "Dark mode",
                other: "System default"
            }
            for (const [key, value] of Object.entries(expected)) {
                const container = CT.querySelector(`logic-switch-recipe[mode='${key}']`, _window);
                CT.spot(value, container, {selectors: 'h1'});
            }
        });
    });
});
