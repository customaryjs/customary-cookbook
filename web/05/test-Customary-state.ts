import 'mocha';
import {CustomaryTestingQueries} from "../test/CustomaryTestingQueries.js";

const FILE = 'Customary-state.html';
const PAGE = `../05/${FILE}`;

export class Test05 { static add_tests() {
    describe(FILE, async function (){
        this.timeout(4000);
        this.slow(500);
        this.retries(6);

        let window: Window;

        before(() => window = globalThis.window.open(PAGE)!);
        after(() => window.close());

        describe('on page load', async function () {
            it('render expected custom element text content', async function () {
                CustomaryTestingQueries.findByTextContent(
                    window.document.querySelector('story-teller')!.shadowRoot!,
                    'He went to space to see the stars.',
                    {selector: 'div'}
                );
            });
        });
    });
}}
