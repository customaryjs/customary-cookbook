import {assert} from "chai";
import 'mocha';
import {CustomaryTestingQueries} from "#customary/testing/CustomaryTestingQueries.js";
import {test_suite} from "../../test/suite.js";

const suite = test_suite(import.meta);

describe(suite.title, async function (){
    this.timeout(4000);
    this.slow(500);

    let window: Window;

    before(() => window = globalThis.window.open(suite.subject_html)!);
    after(() => window.close());

    describe('happy day', async function () {
        const tasks = ["open", "to do", "doing", "done"];

        it('looks good', async function () {
            this.retries(32);

            for (const task of tasks) {
                const el = window.document.querySelector(
                    `attributes-options[task='${task}']`)!;
                const container = el.shadowRoot!;
                CustomaryTestingQueries.findByTextContent(
                    container,
                    `${task}`,
                    {selector: 'h1'}
                );
            }
        });
        let checkbox: HTMLInputElement;
        it('interact', async function () {
            const el = window.document.querySelector(
                `attributes-options[task='to do']`)!;
            checkbox = el.shadowRoot!.querySelector('input') as HTMLInputElement;
            checkbox.click();
        });
        it('looks good', async function () {
            this.retries(32);

            assert.ok(checkbox.checked);

            for (const task of tasks) {
                const element = window.document.querySelector(
                    `attributes-options[task='${task}']`)!;
                const done = element.hasAttribute('done');
                const container = element.shadowRoot!;
                const checkbox = container.querySelector('input')! as HTMLInputElement;
                assert.strictEqual(checkbox.checked, done);
                const h1 = container.querySelector('h1')! as HTMLElement;
                assert.strictEqual(h1.classList.contains('done'), done);
            }
        });
    });
});
