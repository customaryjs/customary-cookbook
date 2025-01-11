const CopyPlugin = require("copy-webpack-plugin");
const RemovePlugin = require('remove-files-webpack-plugin');
const path = require('path');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

module.exports = {
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    // html and js, unbundled. ship sources too; let browsers step debug
                    from: 'web/',
                },
                {
                    // contains customary and lit sources; maps let browsers step debug
                    context: 'node_modules/customary',
                    from: '.dist/bundled/customary.mjs',
                    to: 'node_modules/customary',
                },
                {
                    context: 'node_modules/customary-testing',
                    // FIXME from dist, but not bundled: tester-customary html and css
                    from: 'src/', // hop!
                    to: 'node_modules/customary-testing',
                },
                {
                    // FIXME confirm assertion, improve comment
                    // surprisingly, customary bundled does not ship lit decorators
                    context: 'node_modules',
                    from: '@lit/reactive-element/decorators/{property.js,}',
                    to: 'node_modules/',
                },
                {
                    // FIXME confirm assertion, improve comment
                    // surprisingly, customary bundled does not export lit classes
                    context: 'node_modules',
                    from: '@lit/reactive-element/{reactive-element.js,css-tag.js}',
                    to: 'node_modules/',
                },
                {
                    from: 'node_modules/chai/{chai.js,}',
                },
                {
                    // FIXME attempt module, collapse clauses, add comment
                    context: 'node_modules',
                    from: 'highlight.js/es/languages/xml.js',
                    to: 'node_modules/highlight.js/es/languages/',
                },
                {
                    from: 'node_modules/mocha/{mocha.*,}',
                },
            ]
        }),
        new RemovePlugin({
           after: {
               root: '.dist/development',
               include: [
                   '__JUST_HERE_BECAUSE_CANT_SKIP_WEBPACK_ENTRY.js',
               ]
           }
        }),
        new ReplaceInFileWebpackPlugin([{
            dir: '.dist/development',
            test: /\.html$/,
            rules: [
                {
                    // code: only used in development (live compile)
                    search: /,?\s*\n\s+"#customary\/": ".*"/m,
                    replace: '',
                },
                {
                    // code: only used in development (bundled mjs has lit essentials)
                    search: /,?\s*\n\s+"#customary\/lit": ".*"/m,
                    replace: '',
                },
                {
                    // code: from development (live compile) to production (bundled)
                    search: /("#customary": ".*)node_modules\/customary\/web\/_script\/now.js/g,
                    replace: '$1node_modules/customary/customary.mjs',
                },
                {
                    // node_modules: from development (sibling) to production (child)
                    search: / "(.*)..\/node_modules(.*)"/g,
                    replace: ' "$1node_modules$2"',
                },
                {
                    // code: from development (live compile) to production (hop)
                    search: /customary-testing\/src/g,
                    replace: 'customary-testing',
                },
            ]
        }]),
    ],
    mode: "none",
    entry: './webpack-entry-SKIP.json',
    output: {
        path: path.resolve(__dirname, '.dist/development'),
        filename: '__JUST_HERE_BECAUSE_CANT_SKIP_WEBPACK_ENTRY.js',
    },
}
