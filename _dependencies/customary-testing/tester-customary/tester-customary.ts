import {Customary, CustomaryDeclaration, CustomaryElement} from "#customary";
import 'mocha';
import 'mocha-json-serialize-reporter';

export class TesterCustomary extends CustomaryElement {
	static customary: CustomaryDeclaration<TesterCustomary> = {
		name: 'tester-customary',
		config: {
			state: [
					'run_requested', 'import_tests_callback', 'mocha_css_location',
					'mocha_stats_placeholder_hidden', 'mocha-json-serialize-reporter-output'
			],
		},
		hooks: {
			lifecycle: {
				connected: (el: TesterCustomary) => el.on_connected(),
			},
			events: {
				'button': (el: TesterCustomary) => el.run_requested = true,
			},
			changes: {
				'run_requested': (el: TesterCustomary) => el.run_tests(),
				'import_tests_callback': (el: TesterCustomary) => el.run_tests(),
				'mocha_css_location': (el: TesterCustomary) => el.adopt_mocha_css(),
			},
			externalLoader: {import_meta: import.meta},
		},
	};

	declare run_requested: boolean | undefined;
	declare import_tests_callback: (() => Promise<void>) | undefined;
	declare mocha_css_location: string | undefined;
	declare mocha_stats_placeholder_hidden: boolean | undefined;

	static attach(
			el: Element,
			mocha_css_location: string,
			import_tests_callback: () => Promise<void>
	)
	{
		const tester: TesterCustomary = el.shadowRoot!.querySelector('tester-customary')!;
		tester.mocha_css_location = mocha_css_location;
		tester.import_tests_callback = import_tests_callback;
	}

	private async run_tests(){
		if (!this.run_requested) {return;}
		if (!this.import_tests_callback) {return;}

		this.run_requested = false;
		await this.import_tests_callback();

		this.mocha_stats_placeholder_hidden = true;
		document.getElementById('mocha')?.replaceChildren();
		mocha.run();
	}

	private on_connected() {
		// Mocha *needs* the `#mocha` `div` at `body` root - avoid shadow DOM at all costs
		const htmlDivElement = document.createElement('div');
		htmlDivElement.id = 'mocha';
		document.body.append(htmlDivElement);

		const params = new URLSearchParams(window.location.search);
		const useJsonReporter = params.has('mocha-json-serialize-reporter');

		// https://medium.com/dailyjs/running-mocha-tests-as-native-es6-modules-in-a-browser-882373f2ecb0
		mocha.setup({
			ui: 'bdd', checkLeaks: true,
			...(useJsonReporter ? {reporter: (globalThis as any).MochaJsonSerializeReporter} : {}),
		});
		if (useJsonReporter) {
			mocha.options.reporterOptions = {
				callback: (results: string) => {
					(this as any)['mocha-json-serialize-reporter-output'] = '\n' + results;
				}
			};
		}
		mocha.cleanReferencesAfterRun(false);

		if (!params.has("run-dont"))
			this.run_requested = true;
	}

	private async adopt_mocha_css() {
		if (!this.mocha_css_location) {return;}

		document.adoptedStyleSheets.push(
				await this.fetchCSSStyleSheet(this.mocha_css_location)
		);
	}

	private async fetchCSSStyleSheet(baseURL: string) {
		const text: string = await (await fetch(baseURL)).text();
		const cssStyleSheet = new CSSStyleSheet({baseURL});
		return cssStyleSheet.replace(text);
	}
}

Customary.declare(TesterCustomary);
