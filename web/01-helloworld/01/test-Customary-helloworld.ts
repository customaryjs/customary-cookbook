import 'mocha';
import {CustomaryTestingQueries} from "../../test/CustomaryTestingQueries.js";
import {suite} from "../../test/suite.js";

const PAGE = 'web/01-helloworld/01/Customary-helloworld.html';
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
            CustomaryTestingQueries.findByTextContent(window.document, 'Hello Customary !', {selector: 'h1'});
        });
    });
});
