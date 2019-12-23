[![Build status][travisci-image]][travisci-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Quality Gate][quality-gate-image]][quality-gate-url]

[![NPM dependencies][npm-dependencies-image]][npm-dependencies-url] [![Last commit][last-commit-image]][last-commit-url] [![Last release][release-image]][release-url]

[![NPM downloads][npm-downloads-image]][npm-downloads-url] [![License][license-image]][license-url]

# Cypress sessionStorage commands

Extends Cypress' cy commands with sessionStorage methods. Allows preserving sessionStorage between tests.

## The problem

You want to preserve sessionStorage between Cypress tests.

## This solution

This solution allows you to use all browser sessionStorage methods through Cypress commands, and preserve it between tests.

## Installation

This module is distributed via npm which is bundled with node and should be installed as one of your project's devDependencies:

```bash
npm i --save-dev cypress-sessionstorage-commands
```

## Usage

`cypress-sessionstorage-commands` extends Cypress' cy command.

Add this line to your project's `cypress/support/commands.js`:

```js
import "cypress-sessionstorage-commands";
```

You can now use all next commands:

### Commands

Save current sessionStorage values into an internal "snapshot":

```js
cy.saveSessionStorage();
```

Restore sessionStorage to previously "snapshot" saved values:

```js
cy.restoreSessionStorage();
```

Clear sessionStorage "snapshot" values:

```js
cy.clearSessionStorageSnapshot();
```

Get sessionStorage item. Equivalent to `sessionStorage.getItem` in browser:

```js
cy.getSessionStorage("item");
```

Set sessionStorage item. Equivalent to `sessionStorage.setItem` in browser:

```js
cy.setSessionStorage("item", "value");
```

Remove sessionStorage item. Equivalent to `sessionStorage.removeItem` in browser:

```js
cy.removeSessionStorage("item");
```

### Preserving session storage between tests

Use `saveSessionStorage` to save a snapshot of current `sessionStorage` at the end of one test, and use the `restoreSessionStorage` command to restore it at the beginning of another one:

```js
it("should hide privacy policy message on click accept cookies button", () => {
  cy.get("#accept-cookies").click();
  cy.get("#privacy-policy").should("not.be.visible");
  cy.saveSessionStorage();
});

it("should not show privacy policy message after reloading page", () => {
  cy.restoreSessionStorage();
  cy.reload();
  cy.get("#privacy-policy").should("not.be.visible");
});
```

## Contributing

Contributors are welcome.
Please read the [contributing guidelines](.github/CONTRIBUTING.md) and [code of conduct](.github/CODE_OF_CONDUCT.md).

## License

MIT, see [LICENSE](./LICENSE) for details.

[coveralls-image]: https://coveralls.io/repos/github/javierbrea/cypress-sessionstorage-commands/badge.svg
[coveralls-url]: https://coveralls.io/github/javierbrea/cypress-sessionstorage-commands
[travisci-image]: https://travis-ci.com/javierbrea/cypress-sessionstorage-commands.svg?branch=master
[travisci-url]: https://travis-ci.com/javierbrea/cypress-sessionstorage-commands
[last-commit-image]: https://img.shields.io/github/last-commit/javierbrea/cypress-sessionstorage-commands.svg
[last-commit-url]: https://github.com/javierbrea/cypress-sessionstorage-commands/commits
[license-image]: https://img.shields.io/npm/l/cypress-sessionstorage-commands.svg
[license-url]: https://github.com/javierbrea/cypress-sessionstorage-commands/blob/master/LICENSE
[npm-downloads-image]: https://img.shields.io/npm/dm/cypress-sessionstorage-commands.svg
[npm-downloads-url]: https://www.npmjs.com/package/cypress-sessionstorage-commands
[npm-dependencies-image]: https://img.shields.io/david/javierbrea/cypress-sessionstorage-commands.svg
[npm-dependencies-url]: https://david-dm.org/javierbrea/cypress-sessionstorage-commands
[quality-gate-image]: https://sonarcloud.io/api/project_badges/measure?project=cypress-sessionstorage-commands&metric=alert_status
[quality-gate-url]: https://sonarcloud.io/dashboard?id=cypress-sessionstorage-commands
[release-image]: https://img.shields.io/github/release-date/javierbrea/cypress-sessionstorage-commands.svg
[release-url]: https://github.com/javierbrea/cypress-sessionstorage-commands/releases
