# vinyl-rollup

[![Travis CI][travis-image]][travis-url]
[![Greenkeeper badge][gk-image]](https://greenkeeper.io/)
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![MIT][license-image]](LICENSE)

A wrapper for rollup that produces a stream of Vinyl objects.

## Install vinyl-rollup

This module requires node.js 8 or above.  All testing is done using the `esm` loader.

## Usage

This example shows use of esm with gulp.

```js
npm i -D rollup vinyl-rollup gulp pump esm
```

Create `gulpfile.esm.js`.
```js
import gulp from 'gulp';
import pump from 'pump';
import vinylRollup from 'vinyl-rollup';
import rollupConfig from './rollup.config.js';

export function build() {
	return pump(
		vinylRollup({
			rollup: rollupConfig,
			copyModules: true,
			modulePath: 'node_modules'
		}),
		gulp.dest('build', {sourcemaps: '.'})
	);
}
```

Create `rollup.config.js` for your application.  See the [rollup guide].

### Option `rollup`

This object is used as the rollup configuration.  If `rollup.output.file` is missing
it will be set to the value of `rollup.input`.  If `rollup.output.vinylOpts` is set
it will be removed from the rollup output config and used as the default vinyl object
options for the bundle output.  This does not effect creation vinyl objects created for
the `copyModules` option.

### Option `copyModules`

By default this module will merge streams including `package.json` and license files
from any external module that provided sources to the bundle.  Setting `copyModules`
to `true` will cause all files from these modules to be added to the stream, setting
`copyModules` to `false` will disable copying any original files from bundled modules.

This option only has an effect if rollup is able to resolve 'external' modules. See
`rollup-plugin-node-resolve` or `rollup-plugin-babel` with `babel-plugin-bare-import-rewrite`.

### Option `modulePath`

Default value: `'node_modules'`.

This is used by `copyModules`.  Each bundled source is checked against this path so the
list of included external modules can be calculated.

## Running tests

Tests are provided by xo and ava.

```sh
npm install
npm test
```

[npm-image]: https://img.shields.io/npm/v/vinyl-rollup.svg
[npm-url]: https://npmjs.org/package/vinyl-rollup
[travis-image]: https://travis-ci.org/cfware/vinyl-rollup.svg?branch=master
[travis-url]: https://travis-ci.org/cfware/vinyl-rollup
[gk-image]: https://badges.greenkeeper.io/cfware/vinyl-rollup.svg
[downloads-image]: https://img.shields.io/npm/dm/vinyl-rollup.svg
[downloads-url]: https://npmjs.org/package/vinyl-rollup
[license-image]: https://img.shields.io/github/license/cfware/vinyl-rollup.svg
[rollup guide]: https://rollupjs.org/guide/en#using-config-files
