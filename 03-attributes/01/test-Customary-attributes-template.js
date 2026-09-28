import 'mocha';
import * as CT from "#customary-testing";
import { test_suite } from "../../test/suite.js";
const suite = test_suite(import.meta);
const entries = [
    ["attribute", "A named value declared on an HTML tag."],
    ["template", "Inert HTML, ready to be stamped."],
    ["interpolation", "Text where a value takes its place."],
];
describe(suite.title, async function () {
    this.timeout(4000);
    this.slow(500);
    let window;
    before(() => window = CT.open(suite.subject_html));
    after(() => window.close());
    describe('happy day', async function () {
        it('every term shows as a heading', async function () {
            this.retries(128);
            for (const [term] of entries) {
                const container = CT.querySelector(`attributes-template[term='${term}']`, window);
                CT.spot(term, container, { selectors: 'h1' });
            }
        });
        it('every definition shows as a paragraph', async function () {
            this.retries(128);
            for (const [term, definition] of entries) {
                const container = CT.querySelector(`attributes-template[term='${term}']`, window);
                CT.spot(definition, container, { selectors: 'p' });
            }
        });
    });
});
//# sourceMappingURL=test-Customary-attributes-template.js.map