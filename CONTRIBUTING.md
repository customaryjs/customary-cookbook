# Made with Customary

This project is MADE WITH CUSTOMARY.

https://customaryjs.github.io/

# Add a new recipe

New recipes enter the cookbook under `/src` following the convention:

`/src/<##>-<chapter>/<##>`

Recipe must have a unit test to show in navigation:

`test-<recipe>.ts`

Add the new recipe and its unit test, then run the command:

`npm run build:_command_:data:generate`

The command updates the cookbook index:

`src/data/customary-cookbook-data.json`

The cookbook index will then be used to:

- navigate the cookbook at `npm start`
- populate the unit test suite for `npm test`
- populate the visual test runner at `npm run start:test-runner:in-src-dir`
