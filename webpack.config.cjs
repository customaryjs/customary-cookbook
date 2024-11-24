const CopyPlugin = require("copy-webpack-plugin");
const RemovePlugin = require('remove-files-webpack-plugin');
const path = require('path');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

module.exports = {
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    // we copy web/*.ts files too because browsers can step debug them
                    from: 'web/',
                },
                {
                    from: 'node_modules/customary/.dist/development/',
                    to: 'node_modules/customary/',
                },
                {
                    from: 'node_modules/customary/node_modules/lit-for-customary/.dist/bundled/lit-for-customary.mjs',
                    to: 'node_modules/lit-for-customary/',
                },
                {
                    context: 'node_modules',
                    from: 'chai/chai.js',
                    to: 'node_modules/chai/',
                },
                {
                    context: 'node_modules',
                    from: 'highlight.js/es/languages/xml.js',
                    to: 'node_modules/highlight.js/es/languages/',
                },
                {
                    context: 'node_modules',
                    from: 'knockout/build/output/knockout-latest.debug.js',
                    to: 'node_modules/knockout/build/output/',
                },
                {
                    context: 'node_modules',
                    from: 'mocha/mocha.*',
                    to: 'node_modules/',
                }
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
                    search: /node_modules\/customary\/node_modules\/lit-for-customary\/.dist\/bundled/g,
                    replace: 'node_modules/lit-for-customary',
                },
                {
                    search: / "(.*)..\/node_modules(.*)"/g,
                    replace: ' "$1./node_modules$2"',
                },
                {
                    search: /customary\/web\/_script/g,
                    replace: 'customary/_script',
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
