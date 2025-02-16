import {assert} from "chai";
import 'mocha';
import {CustomaryTesting as CT} from "#customary-testing";
import {test_suite} from "../../test/suite.js";

const suite = test_suite(import.meta);

describe(suite.title, async function (){
	this.timeout(4000);
	this.slow(500);

	let window: Window;
	let element: Element;
	let input: HTMLInputElement;
	let evidence: Element;

	before(() => window = CT.open(suite.subject_html));
	after(() => window.close());

	describe('happy day', async function () {
		function assert_evidence(expected: string) {
			assert.equal(CT.allTextContent(evidence), expected);
		}
		it('looks good', async function () {
			this.retries(64);
			element = CT.querySelector('bindings-checkbox', window);
			evidence = CT.querySelector('h1', element);
			assert_evidence("false");
		});
		it('interact', async function () {
			input = CT.querySelector('input', element) as HTMLInputElement;
			CT.checkbox(input);
		});
		it('looks good', async function () {
			this.retries(64);
			assert_evidence("true");
			assert.equal(element.shadowRoot!.activeElement, input);
		});
	});
});
