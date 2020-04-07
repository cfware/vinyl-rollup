# vinyl-rollup

![Tests][tests-status]
[![Greenkeeper badge][gk-image]](https://greenkeeper.io/)
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![MIT][license-image]](LICENSE)

A wrapper for rollup that produces a stream of Vinyl objects.

## Install vinyl-rollup

This is a native ES module.

## Usage

This example shows how to write a script which performs a vinyl-rollup based build.
The `build` export of this script could also be used as a gulp task.

```js
npm i -D rollup vinyl-rollup vinyl-fs
```

Create `build.mjs`:
```js
#!/usr/bin/env node
import {pipeline} from 'stream';
import {promisify} from 'util';

import vinylFS from 'vinyl-fs';
import vinylRollup from 'vinyl-rollup';

import rollupConfig from './rollup.config.js';

export const build = () => promisify(pipeline)(
	vinylRollup({
		rollup: rollupConfig,
		copyModules: true,
		modulePath: 'node_modules'
	}),
	vinylFS.dest('build', {sourcemaps: '.'})
);

build().catch(error => {
	console.error(error);
	process.exit(1);
});
```

Create `rollup.config.js` for your application.  See the [rollup guide].

### Option `rollup`

This object is used as the rollup configuration.  If `rollup.output.file` is missing
it will be set to the value of `rollup.input`.  If `rollup.output.vinylOptions` is set
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


[npm-image]: https://img.shields.io/npm/v/vinyl-rollup.svg
[npm-url]: https://npmjs.org/package/vinyl-rollup
[tests-status]: https://github.com/cfware/vinyl-rollup/workflows/Tests/badge.svg
[gk-image]: https://badges.greenkeeper.io/cfware/vinyl-rollup.svg
[downloads-image]: https://img.shields.io/npm/dm/vinyl-rollup.svg
[downloads-url]: https://npmjs.org/package/vinyl-rollup
[license-image]: https://img.shields.io/github/license/cfware/vinyl-rollup.svg
[rollup guide]: https://rollupjs.org/guide/en#using-config-files
