import 'mocha';
import {CustomaryTestingQueries} from "../../test/CustomaryTestingQueries.js";
import {suite} from "../../test/suite.js";

const PAGE = 'web/01-helloworld/02-05/Customary-helloworld-slot.html';
const URL = `../../${PAGE}`;

describe(suite(PAGE), async function (){
    this.timeout(4000);
    this.slow(500);

    let window: Window;

    before(() => window = globalThis.window.open(URL)!);
    after(() => window.close());

    describe('on page load', async function () {
        it('render expected custom element text content', async function () {
            this.retries(16);
            CustomaryTestingQueries.findByTextContent(window.document, 'Hello Customary !', {selector: 'h1'});
        });
    });
});
