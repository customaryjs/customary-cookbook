import 'mocha';
import * as chai from 'chai';
import * as CT from "#customary-testing";
import { test_suite } from "../../test/suite.js";
const suite = test_suite(import.meta);
describe(suite.title, async function () {
    this.timeout(4000);
    this.slow(500);
    let window;
    let element;
    let input;
    before(() => window = CT.open(suite.subject_html));
    after(() => window.close());
    describe('happy day', async function () {
        it('looks good', async function () {
            this.retries(128);
            element = CT.querySelector('bindings-changes-and-derive', window);
            input = CT.querySelector('input', element);
            chai.assert.isTrue(input.classList.contains('bg-green'));
        });
        it('interact', async function () {
            CT.input('123', input);
        });
        it('looks good', async function () {
            this.retries(64);
            CT.spot('Is digits: true', element, { selectors: 'p' });
            chai.assert.isTrue(input.classList.contains('bg-green'));
        });
        it('interact', async function () {
            CT.input('abc', input);
        });
        it('looks good', async function () {
            this.retries(64);
            CT.spot('Is digits: false', element, { selectors: 'p' });
            chai.assert.isTrue(input.classList.contains('bg-red'));
        });
    });
});
//# sourceMappingURL=test-Customary-bindings-changes-and-derive.js.map