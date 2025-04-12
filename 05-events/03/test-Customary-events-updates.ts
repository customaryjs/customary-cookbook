import 'mocha';
import {CustomaryTesting as CT} from "#customary-testing";
import {test_suite} from "../../test/suite.js";
import {assert} from "chai";

const suite = test_suite(import.meta);

describe(suite.title, async function (){
    this.timeout(4000);
    this.slow(500);

    let window: Window;
    let element: Element;
    let evidence: Element;

    before(() => window = CT.open(suite.subject_html));
    after(() => window.close());

    describe('happy day', async function () {
        it('looks good', async function () {
            this.retries(64);
            element = CT.querySelector('events-updates-recipe', window);
        });
        it('interact', async function () {
            this.retries(64);
            (CT.querySelector('#add_button', element) as HTMLButtonElement).click();
        });
        it('interact', async function () {
            this.retries(64);
            evidence = CT.querySelector('button.dynamic[value="3"]', element);
            (evidence as HTMLButtonElement).click();
        });
        it('looks good', async function () {
            this.retries(64);
            evidence = CT.querySelector('button.dynamic[value="3"]', element);
            assert.equal(CT.allTextContent(evidence), 'ruoF');
        });
    });
});
