import 'mocha';
import {CustomaryTestingQueries} from "#customary-testing";
import {test_suite} from "../../test/suite.js";

const suite = test_suite(import.meta);

describe(suite.title, async function (){
    this.timeout(4000);
    this.slow(500);

    let window: Window;

    before(() => window = globalThis.window.open(suite.subject_html)!);
    after(() => window.close());

    describe('happy day', async function () {
        it('looks good', async function () {
            this.retries(128);

            function assertChord(id: string, chord: string) {
                const container = window.document.getElementById(id)!.shadowRoot!;
                const keys = chord.split('');
                for (const key of keys) {
                    CustomaryTestingQueries.findByClass(
                        container, 'chord', {selector: `#${key}`}
                    );
                }
            }

            assertChord('one', 'CEG');
            assertChord('two', 'DFA');
            assertChord('three', 'EGB');
        });
    });
});
