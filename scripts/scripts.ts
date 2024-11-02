import {spawn} from 'child_process';

const scripts: Record<string, Function> = {
	"dist-dependency:chai": () =>
			dist({dependency: 'chai', includes: 'chai.js'}),
	"dist-dependency:customary": () =>
			dist({dependency: 'customary', includes: '.dist/**/*'}),
	'dist-dependency:highlight.js': ()=>
			dist({dependency: 'highlight.js', includes: 'es/languages/xml.js'}),
	"dist-dependency:knockout": () =>
			dist({dependency: 'knockout', includes: 'build/output/knockout-latest.debug.js'}),
	"dist-dependency:mocha": () =>
			dist({dependency: 'mocha', includes: 'mocha.*'}),
};

const script = process.argv[2];

const fn: Function = scripts[script]
		?? (() => {throw new Error(`${script} is not defined`)});

fn();

function dist({dependency, includes}: {dependency: string, includes: string}) {
	const a = `node_modules/${dependency}/${includes}`;
	const b = `.dist/web/_lib/${dependency}/`;
	const up = includes.startsWith('.dist') ? '3' : '2';
	spawn_(`copyfiles --error --all --up ${up} ${a} ${b}`);
}

function spawn_(cmd_str: string) {
	const parts = cmd_str.split(' ');
	const cmd = parts[0];
	const args = parts.slice(1);
	console.log(cmd);
	console.log(args);
	spawn(cmd, args, {shell: process.platform === 'win32'});
}
