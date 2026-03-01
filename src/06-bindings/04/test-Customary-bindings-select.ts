import {assert} from "chai";
import 'mocha';
import * as CT from "#customary-testing";
import {test_suite} from "../../test/suite.js";

const suite = test_suite(import.meta);

describe(suite.title, async function (){
	this.timeout(4000);
	this.slow(500);

	let window: Window;
	let element: Element;
	let select: HTMLSelectElement;
	let evidence: Element;

	before(() => window = CT.open(suite.subject_html));
	after(() => window.close());

	describe('happy day', async function () {
		function assert_evidence(expected: string) {
			assert.equal(CT.allTextContent(evidence), expected);
		}
		it('looks good', async function () {
			this.retries(128);
			element = CT.querySelector('bindings-select', window);
			evidence = CT.querySelector('h1', element);
			assert_evidence("one");
		});
		it('interact', async function () {
			select = CT.querySelector('select', element) as HTMLSelectElement;
			CT.select("two", select);
		});
		it('looks good', async function () {
			this.retries(64);
			assert_evidence("two");
			assert.equal(element.shadowRoot!.activeElement, select);
		});
	});
});
