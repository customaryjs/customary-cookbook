import {PlaywrightMochaBrowserAdapter} from "playwright-mocha-browser-adapter/src/index.js";

await test();

async function test() {
    await new PlaywrightMochaBrowserAdapter().execute();
}
