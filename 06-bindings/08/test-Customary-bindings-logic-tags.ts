import {CustomaryElement} from "#customary";
import * as CT from "#customary-testing";
import {test_suite} from "../../test/suite.js";
import * as chai from "chai";
import 'mocha';

const suite = test_suite(import.meta);

describe(suite.title, async function (){
	this.timeout(4000);
	this.slow(500);

	let window: Window;
	let element: CustomaryElement;
	let input: HTMLInputElement;
	let textarea: HTMLTextAreaElement;

	before(() => window = CT.open(suite.subject_html));
	after(() => window.close());

	describe('happy day', async function () {
		function spot_binding_output(expected: string) {
			CT.spot(expected, element, {selectors: 'h1'});
		}
		it('looks good', async function () {
			this.retries(64);
			element = CT.querySelector('bindings-logic-tags-recipe', window);
			input = CT.querySelector('input', element) as HTMLInputElement;
			textarea = CT.querySelector('textarea', element) as HTMLTextAreaElement;
			spot_binding_output("Hello Customary !");
		});
		it('interact', async function () {
			CT.input('!!!', input);
		});
		it('looks good', async function () {
			this.retries(64);
			spot_binding_output("Hello Customary !!!!");
			chai.assert.equal(CT.activeElement(element), input);
		});
		it('interact', async function () {
			CT.textarea('!!!!!', textarea);
		});
		it('looks good', async function () {
			this.retries(64);
			spot_binding_output("Hello Customary !!!!!!!!!");
			chai.assert.equal(CT.activeElement(element), textarea);
		});
	});
});
