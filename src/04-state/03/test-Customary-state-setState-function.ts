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
        let container: Element;
        function assert_element() {
            container = CT.querySelector('recipe-card', window);
        }
        function assert_textContent(textContent: string) {
            CT.spot(textContent, container, {selectors: 'div.c > div'});
        }
        it('looks good', async function () {
            this.retries(64);
            assert_element();
            assert_textContent("02-state/03/test-Customary-state-setState-function.ts");
        });
        it('interact', async function () {
            (CT.querySelector('button', container) as HTMLButtonElement).click();
        });
        it('looks good', async function () {
            this.retries(16);
            assert_textContent("st.noitcnuf-etatStes-etats-yramotsuC-tset/30/etats-20");
        });
    });
});
