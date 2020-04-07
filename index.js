import path from 'path';
import {PassThrough} from 'stream';

import {rollup} from 'rollup';
import vfs from 'vinyl-fs';
import Vinyl from 'vinyl';
import merge2 from 'merge2';

function bundleModuleNames(modules, modulePath) {
	const webSet = new Set();

	for (const source of modules) {
		const id = path.relative(modulePath, source);
		if (!(id.startsWith('.') || id.startsWith('node_modules'))) {
			const webmod = id.split(path.sep, id[0] === '@' ? 2 : 1).join(path.sep);

			webSet.add(webmod);
		}
	}

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
	return [].concat(output).map(entry => {
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

	delete rollupConfig.vinylOptions;

	const {output} = await bundle.generate(rollupConfig);
	const {code, map} = output[0];
	const vinylOptions = {
		...(entry.vinylOptions || {}),
		path: entry.file,
		contents: Buffer.from(code)
	};

	if (map) {
		vinylOptions.sourceMap = map;
	}

	return new Vinyl(vinylOptions);
}

async function runRollup(options, merged) {
	const {input} = options.rollup;

	if (typeof input !== 'string') {
		throw new TypeError('options.rollup.input must be a string');
	}

	const output = processOutput(options.rollup.output, input);

	if (!['undefined', 'string'].includes(typeof options.modulePath)) {
		throw new TypeError('options.modulePath must be a string if defined');
	}

	if (!['undefined', 'boolean'].includes(typeof options.copyModules)) {
		throw new TypeError('options.copyModules must be a boolean if defined');
	}

	const bundle = await rollup(options.rollup);
	const results = [];
	for (const entry of output) {
		// eslint-disable-next-line no-await-in-loop
		results.push(await runBundle(bundle, entry));
	}

	if (options.copyModules !== false) {
		const modulePath = path.resolve(options.modulePath || 'node_modules');
		const modules = bundleModuleNames(bundle.watchFiles, modulePath);
		const base = '.';

		if (options.copyModules === true) {
			for (const module of modules) {
				const globs = [
					path.join(modulePath, module, '**'),
					`!${path.join(modulePath, module, 'node_modules/**')}`
				];
				merged.add(vfs.src(globs, {base, nodir: true}));
			}
		} else if (modules.length > 0) {
			/* Include package.json and LICENSE files by default. */
			const casedGlobs = modules.map(module => path.join(modulePath, module, 'package.json'));
			const uncasedGlobs = modules.map(module => path.join(modulePath, module, 'licen{s,c}e*'));

			merged.add(vfs.src(casedGlobs, {base, nodir: true}));
			merged.add(vfs.src(uncasedGlobs, {base, nocase: true}));
		}
	}

	const rollupStream = new PassThrough({objectMode: true});
	merged.add(rollupStream);
	for (const vinyl of results) {
		rollupStream.write(vinyl);
	}

	rollupStream.end();
}

function vinylRollup(options) {
	const merged = merge2();

	runRollup(options, merged).catch(error => {
		merged.emit('error', error);
	});

	return merged;
}

export default vinylRollup;
