import path from 'path';
import stream from 'stream';
import {once} from 'events';
import {promisify} from 'util';

import t from 'libtap';
import concat from 'concat-stream';
import rollupBabel from 'rollup-plugin-babel';
import sourcemaps from 'gulp-sourcemaps';

import vinylRollup from '../index.js';

const pipeline = promisify(stream.pipeline);

function testRollup(options, ...pumps) {
	const vinylStream = vinylRollup(options);
	if (pumps.length === 0) {
		return once(vinylStream, 'finished');
	}

	return pipeline(vinylStream,
		...pumps
	);
}

function vinylSort(a, b) {
	if (a.relative < b.relative) {
		return -1;
	}

	if (a.relative > b.relative) {
		return 1;
	}

	return 0;
}

const normalizeCRLF = string => string.replace(/\r\n/gu, '\n').replace(/\\r\\n/gu, '\\n');

const babelrcRelativeResolver = {
	babelrc: false,
	configFile: false,
	plugins: [
		['bare-import-rewrite', {
			rootPath: 'fixtures',
			modulesDir: 'fixtures/node_modules'
		}]
	]
};

function vinylSnapshot({contents, relative, sourceMap}) {
	if (sourceMap) {
		sourceMap = {
			...sourceMap,
			sourcesContent: sourceMap.sourcesContent.map(content => normalizeCRLF(content))
		};
	}

	return {
		contents: normalizeCRLF(contents.toString()),
		// Coerse Windows relative paths to posix format.
		relative: relative.replace(/\\/gu, '/'),
		sourceMap
	};
}

function concatSnapshot(t) {
	return concat(files => {
		t.matchSnapshot(files.map(vinylSnapshot).sort(vinylSort));
	});
}

t.test('exports a function', async t => {
	t.type(vinylRollup, 'function');
});

t.test('emits error on invalid options', async t => {
	await t.rejects(testRollup());
	await t.rejects(testRollup({}));
	await t.rejects(testRollup({
		rollup: {}
	}));
	await t.rejects(testRollup({
		rollup: {
			input: 'test.js',
			output: {file: null}
		}
	}));
	await t.rejects(testRollup({
		rollup: {
			input: 'test.js',
			output: {file: null}
		}
	}));
	await t.rejects(testRollup({
		rollup: {
			input: []
		}
	}));
	await t.rejects(testRollup({
		rollup: {
			input: [null, 'input.js']
		}
	}));
	await t.rejects(testRollup({
		rollup: {
			input: ['input.js', 'input2.js'],
			output: {file: null}
		}
	}));
	await t.rejects(testRollup({
		modulePath: 5,
		rollup: {
			input: 'red.js'
		}
	}));
	await t.rejects(testRollup({
		rollup: {
			input: 'file-not-found.js'
		}
	}));
	await t.rejects(testRollup({
		rollup: {
			input: 'fixtures/invalid-import.js'
		}
	}));
	await t.rejects(testRollup({
		rollup: {
			input: 'fixtures/input1.js',
			output: [
				{format: 'esm'},
				{format: 'esm'}
			]
		}
	}));
	await t.rejects(testRollup({
		rollup: {
			input: 'fixtures/input1.js',
			output: {
				format: 'esm'
			}
		},
		copyModules: 'purple'
	}));
});

t.test('valid file', async t => {
	const options = {
		rollup: {
			input: 'fixtures/input1.js',
			output: {
				format: 'esm'
			}
		}
	};
	await testRollup(options, concatSnapshot(t));
});

t.test('valid file with sourcemaps enabled', async t => {
	const options = {
		rollup: {
			input: 'fixtures/input1.js',
			output: {
				format: 'esm',
				sourcemap: true
			}
		}
	};
	await testRollup(options, concatSnapshot(t));
});

t.test('compatible with gulp-sourcemaps', async t => {
	const options = {
		rollup: {
			input: 'fixtures/input1.js',
			output: {
				format: 'esm',
				sourcemap: true
			}
		}
	};
	await testRollup(options, sourcemaps.init(), sourcemaps.write('.'), concatSnapshot(t));
});

t.test('module import and license files only', async t => {
	const options = {
		rollup: {
			input: 'fixtures/import-module.js',
			output: {
				format: 'esm',
				sourcemap: true
			},
			plugins: [
				rollupBabel({
					babelrc: false,
					configFile: false,
					plugins: [
						['bare-import-rewrite', {
							rootPath: path.resolve('fixtures'),
							modulesDir: path.resolve('fixtures/node_modules'),
							fsPath: true
						}]
					]
				})
			]
		},
		modulePath: path.resolve('fixtures/node_modules')
	};
	await testRollup(options, concatSnapshot(t));
});

t.test('module import and copy all files', async t => {
	const options = {
		rollup: {
			input: 'fixtures/import-module.js',
			output: {
				format: 'esm',
				sourcemap: true
			},
			plugins: [
				rollupBabel(babelrcRelativeResolver)
			]
		},
		modulePath: 'fixtures/node_modules',
		copyModules: true
	};

	await testRollup(options, concatSnapshot(t));
});

t.test('module import and copy all files with vinylOptions', async t => {
	const options = {
		rollup: {
			input: 'fixtures/import-module.js',
			output: {
				format: 'esm',
				sourcemap: true,
				vinylOptions: {
					base: 'fixtures'
				}
			},
			plugins: [
				rollupBabel(babelrcRelativeResolver)
			]
		},
		modulePath: 'fixtures/node_modules',
		copyModules: true
	};

	await testRollup(options, concatSnapshot(t));
});

t.test('module import with no copy', async t => {
	const options = {
		rollup: {
			input: 'fixtures/import-module.js',
			output: {
				format: 'esm',
				sourcemap: true
			},
			plugins: [
				rollupBabel(babelrcRelativeResolver)
			]
		},
		modulePath: 'fixtures/node_modules',
		copyModules: false
	};

	await testRollup(options, concatSnapshot(t));
});

t.test('multiple output files', async t => {
	const options = {
		rollup: {
			input: 'fixtures/import-module.js',
			output: [
				{file: 'fixtures/import-module.mjs', format: 'esm', sourcemap: true},
				{file: 'fixtures/import-module.js', format: 'cjs', sourcemap: true}
			],
			plugins: [
				rollupBabel(babelrcRelativeResolver)
			]
		},
		modulePath: 'fixtures/node_modules'
	};

	await testRollup(options, concatSnapshot(t));
});
