import 'mocha';
import {CustomaryTestingQueries} from "../test/CustomaryTestingQueries.js";

const PAGE = '../01/Customary-hello_world.html';

export class Test01 { static add_tests() {
    describe('Customary-hello_world.html', async function (){
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
