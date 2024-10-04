import 'mocha';
import {CustomaryTestingQueries} from "../../test/CustomaryTestingQueries.js";
import {suite} from "../../test/suite.js";

const PAGE = 'web/02-state/05/Customary-state.html';
const URL = `../../${PAGE}`;

describe(suite(PAGE), async function (){
    this.timeout(4000);
    this.slow(500);
    this.retries(6);

    let window: Window;

    before(() => window = globalThis.window.open(URL)!);
    after(() => window.close());

    describe('on page load', async function () {
        it('render expected custom element text content', async function () {
            CustomaryTestingQueries.findByTextContent(
                window.document.querySelector('story-teller')!.shadowRoot!,
                'He went to space to see the stars. ' +
                'She went to sea to see the stars. ' +
                'We went to shows to see the stars, ' +
                'I went to sleep to see the stars.',
                {selector: 'div'}
            );
        });
    });
});
