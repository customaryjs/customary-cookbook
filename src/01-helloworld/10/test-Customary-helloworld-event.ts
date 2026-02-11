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
        let element: HTMLElement;
        function assert_element() {
            element = CT.querySelector('hello-world', window);
        }
        it('looks good', async function () {
            this.retries(64);
            assert_element();
            CT.spot('Hello Customary !', element, {selectors: 'span'});
        });
        it('interact', async function () {
            (CT.querySelector('button', element) as HTMLButtonElement).click();
        });
        it('looks good', async function () {
            this.retries(16);
            chai.assert.isAbove(
                Number.parseFloat(element.style.fontSize.replace('px', '')),
                40
            );
        });
    });
});
