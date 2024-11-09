// @ts-ignore
import CopyPlugin = require("copy-webpack-plugin");
// @ts-ignore
import RemovePlugin = require('remove-files-webpack-plugin');
// @ts-ignore
import ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
// @ts-ignore
import webpack = require('webpack');
// @ts-ignore
import path = require('path');

const config: webpack.Configuration = {
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    // we copy web/*.ts files too because browsers can step debug them
                    from: 'web/',
                },
                {
                    from: 'node_modules/customary/.dist/',
                    to: '_lib/customary/',
                },
                {
                    context: 'node_modules',
                    from: 'chai/chai.js',
                    to: '_lib/chai/',
                },
                {
                    context: 'node_modules',
                    from: 'highlight.js/es/languages/xml.js',
                    to: '_lib/highlight.js/es/languages/',
                },
                {
                    context: 'node_modules',
                    from: 'knockout/build/output/knockout-latest.debug.js',
                    to: '_lib/knockout/build/output/',
                },
                {
                    context: 'node_modules',
                    from: 'mocha/mocha.*',
                    to: '_lib/',
                }
            ]
        }),
        new RemovePlugin({
           after: {
               root: '.dist',
               include: [
                   '__JUST_HERE_BECAUSE_CANT_SKIP_WEBPACK_ENTRY.js',
               ]
           }
        }),
        new ReplaceInFileWebpackPlugin([{
            dir: '.dist',
            test: /\.html$/,
            rules: [{
                search: / "(.*)..\/node_modules(.*)"/g,
                replace: ' "$1./_lib$2"',
            }]
        }]),
    ],
    mode: "none",
    entry: './webpack-entry-SKIP.json',
    output: {
        path: path.resolve(__dirname, '.dist'),
        filename: '__JUST_HERE_BECAUSE_CANT_SKIP_WEBPACK_ENTRY.js',
    },
}

export default config;
