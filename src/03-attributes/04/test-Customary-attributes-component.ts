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

            function assertChord(id: string, chord: string) {
                const element = CT.querySelector(`#${id}`, window);
                const keys = chord.split('');
                for (const key of keys) {
                    findByClass(element, 'bright', {selector: `#${key}`});
                }
            }

            assertChord('one', 'CEG');
            assertChord('two', 'DFA');
            assertChord('three', 'EGB');
        });
    });
});

function findByClass(element: Element, expected: string, {selector}:{selector: string})
{
    const elements = CT.querySelectorAll(selector, element);
    for (const element of elements) {
        if (element.classList.contains(expected)) {
            return element;
        }
    }
    throw new Error(`No element matching ${selector} has class ${expected}`);
}
