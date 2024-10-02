import 'mocha';
import {CustomaryTestingQueries} from "../test/CustomaryTestingQueries.js";

const FILE = 'Customary-hello_world-slot.html';
const PAGE = `../02-05/${FILE}`;

export class Test02_05 { static add_tests() {
    describe(FILE, async function (){
        this.timeout(4000);
        this.slow(500);
        this.retries(6);

        let window: Window;

        before(() => window = globalThis.window.open(PAGE)!);
        after(() => window.close());

        describe('on page load', async function () {
            it('render expected custom element text content', async function () {
                CustomaryTestingQueries.findByTextContent(window.document, 'Hello Customary !', {selector: 'h1'});
            });
        });
    });
}}
