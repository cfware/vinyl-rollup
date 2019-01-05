'use strict';

import path from 'path';
import {PassThrough} from 'stream';

import {rollup} from 'rollup';
import vfs from 'vinyl-fs';
import Vinyl from 'vinyl';
import arrify from 'arrify';
import pMap from 'p-map';
import merge2 from 'merge2';

function bundleModuleNames(modules, modulePath) {
	const webSet = new Set();

	modules.forEach(mod => {
		Object.values(mod.resolvedIds).forEach(absid => {
			const id = path.relative(modulePath, absid);
			if (id[0] !== '.') {
				const webmod = id.split('/', id[0] === '@' ? 2 : 1).join('/');

				webSet.add(webmod);
			}
		});
	});

	return [...webSet];
}

function processOutput(output, input) {
	if (typeof output === 'undefined') {
		return [{
			file: input,
			format: 'es'
		}];
	}

	const outputList = new Set();
	return arrify(output).map(entry => {
		entry = {
			file: input,
			...entry
		};

		if (typeof entry.file !== 'string') {
			throw new TypeError('output.file must be a string.');
		}

		if (outputList.has(entry.file)) {
			throw new TypeError(`Cannot output to the same file multiple times: ${entry.file}`);
		}
		outputList.add(entry.file);
		return entry;
	});
}

async function runBundle(bundle, entry) {
	const rollupConfig = {...entry};

	delete rollupConfig.vinylOpts;

	const {output} = await bundle.generate(rollupConfig);
	const {code, map} = output[0];
	const vinylOpts = {
		...(entry.vinylOpts || {}),
		path: entry.file,
		contents: Buffer.from(code)
	};

	if (map) {
		vinylOpts.sourceMap = map;
	}

	return new Vinyl(vinylOpts);
}

async function runRollup(opts, merged) {
	const {input} = opts.rollup;

	if (typeof input !== 'string') {
		throw new TypeError('opts.rollup.input must be a string');
	}

	const output = processOutput(opts.rollup.output, input);

	if (!['undefined', 'string'].includes(typeof opts.modulePath)) {
		throw new TypeError('opts.modulePath must be a string if defined');
	}

	if (!['undefined', 'boolean'].includes(typeof opts.copyModules)) {
		throw new TypeError('opts.copyModules must be a boolean if defined');
	}

	const bundle = await rollup(opts.rollup);
	const results = await pMap(output, entry => runBundle(bundle, entry), {concurrency: 1});

	if (opts.copyModules !== false) {
		const modulePath = path.resolve(opts.modulePath || 'node_modules');
		const modules = bundleModuleNames(bundle.cache.modules, modulePath);
		const casedGlob = [];
		const uncasedGlob = [];
		const base = '.';

		if (opts.copyModules === true) {
			casedGlob.push(...modules.map(mod => path.join(modulePath, mod, '**')));
		} else {
			/* Include package.json and LICENSE files by default. */
			casedGlob.push(...modules.map(mod => path.join(modulePath, mod, 'package.json')));
			uncasedGlob.push(...modules.map(mod => path.join(modulePath, mod, 'licen{s,c}e*')));
		}

		if (casedGlob.length > 0) {
			merged.add(vfs.src(casedGlob, {base, nodir: true}));
		}

		if (uncasedGlob.length > 0) {
			merged.add(vfs.src(uncasedGlob, {base, nocase: true}));
		}
	}

	const rollupStream = new PassThrough({objectMode: true});
	merged.add(rollupStream);
	results.forEach(vinyl => {
		rollupStream.write(vinyl);
	});

	rollupStream.end();
}

function vinylRollup(opts) {
	const merged = merge2();

	runRollup(opts, merged).catch(error => {
		merged.emit('error', error);
	});

	return merged;
}

export default vinylRollup;
