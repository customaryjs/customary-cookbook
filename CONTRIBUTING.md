# Made with Customary

This project is MADE WITH CUSTOMARY.

https://customaryjs.github.io/

# Recipe directories

Add new recipes under `/src` following the convention:

`/src/<##>-<feature_set>/<##>`

# Unit tests

The full list of test sources is here:

[[/src/data/tests.txt]]

This file is maintained by hand. 
After you create a new recipe, add its unit test to this file.

The test runner is a web page made with the Customary Testing tool:

`/src/test.html`

It populates the Mocha test suite from the `tests.txt` file.

# Navigation Data

The `tests.txt` file also populates:

`src/data/customary-cookbook-data.json`

Cookbook screen uses this data file to populate recipe navigation.

When a new recipe is added, and `tests.txt` updated, a human must:

1. visit `/src/data/data.html` 
2. use the "Generate data" button (will auto copy to clipboard)
3. paste the new data into `customary-cookbook-data.json`
4. navigate to the recipe
5. use the sidebar link to run the recipe's unit test.
