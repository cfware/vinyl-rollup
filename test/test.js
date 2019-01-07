import test from 'ava';

import path from 'path';
import pEvent from 'p-event';
import pump from 'pump';
import concat from 'concat-stream';
import rollupResolve from 'rollup-plugin-node-resolve';
import rollupBabel from 'rollup-plugin-babel';
import sourcemaps from 'gulp-sourcemaps';

import vinylRollup from '..';

function testRollup(opts, ...pumps) {
	const vinyl = vinylRollup(opts);
	const emitter = pumps.length === 0 ? vinyl : pump(vinyl, ...pumps);

	return pEvent(emitter, 'finish');
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

const normalizeCRLF = str => str.replace(/\r\n/g, '\n').replace(/\\r\\n/g, '\\n');

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
		relative: relative.replace(/\\/g, '/'),
		sourceMap
	};
}

function concatSnapshot(t) {
	return concat(files => {
		t.snapshot(files.map(vinylSnapshot).sort(vinylSort));
	});
}

test('exports a function', t => {
	t.is(typeof vinylRollup, 'function');
});

test('emits error on invalid opts', async t => {
	await t.throwsAsync(testRollup());
	await t.throwsAsync(testRollup({}));
	await t.throwsAsync(testRollup({
		rollup: {}
	}));
	await t.throwsAsync(testRollup({
		rollup: {
			input: 'test.js',
			output: {file: null}
		}
	}));
	await t.throwsAsync(testRollup({
		rollup: {
			input: 'test.js',
			output: {file: null}
		}
	}));
	await t.throwsAsync(testRollup({
		rollup: {
			input: []
		}
	}));
	await t.throwsAsync(testRollup({
		rollup: {
			input: [null, 'input.js']
		}
	}));
	await t.throwsAsync(testRollup({
		rollup: {
			input: ['input.js', 'input2.js'],
			output: {file: null}
		}
	}));
	await t.throwsAsync(testRollup({
		modulePath: 5,
		rollup: {
			input: 'red.js'
		}
	}));
	await t.throwsAsync(testRollup({
		rollup: {
			input: 'file-not-found.js'
		}
	}));
	await t.throwsAsync(testRollup({
		rollup: {
			input: 'fixtures/invalid-import.js'
		}
	}));
	await t.throwsAsync(testRollup({
		rollup: {
			input: 'fixtures/input1.js',
			output: [
				{format: 'esm'},
				{format: 'esm'}
			]
		}
	}));
	await t.throwsAsync(testRollup({
		rollup: {
			input: 'fixtures/input1.js',
			output: {
				format: 'esm'
			}
		},
		copyModules: 'purple'
	}));
});

test('valid file', async t => {
	const opts = {
		rollup: {
			input: 'fixtures/input1.js',
			output: {
				format: 'esm'
			}
		}
	};
	await t.notThrowsAsync(testRollup(opts, concatSnapshot(t)));
});

test('valid file with sourcemaps enabled', async t => {
	const opts = {
		rollup: {
			input: 'fixtures/input1.js',
			output: {
				format: 'esm',
				sourcemap: true
			}
		}
	};
	await t.notThrowsAsync(testRollup(opts, concatSnapshot(t)));
});

test('compatible with gulp-sourcemaps', async t => {
	const opts = {
		rollup: {
			input: 'fixtures/input1.js',
			output: {
				format: 'esm',
				sourcemap: true
			}
		}
	};
	await t.notThrowsAsync(testRollup(opts, sourcemaps.init(), sourcemaps.write('.'), concatSnapshot(t)));
});

test('module import and license files only', async t => {
	const opts = {
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
	await t.notThrowsAsync(testRollup(opts, concatSnapshot(t)));
});

test('module import and copy all files', async t => {
	const opts = {
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
							rootPath: 'fixtures',
							modulesDir: 'fixtures/node_modules'
						}]
					]
				})
			]
		},
		modulePath: 'fixtures/node_modules',
		copyModules: true
	};

	await t.notThrowsAsync(testRollup(opts, concatSnapshot(t)));
});

test('module import and copy all files with vinylOpts', async t => {
	const opts = {
		rollup: {
			input: 'fixtures/import-module.js',
			output: {
				format: 'esm',
				sourcemap: true,
				vinylOpts: {
					base: 'fixtures'
				}
			},
			plugins: [
				rollupResolve({
					customResolveOptions: {
						moduleDirectory: 'fixtures/node_modules'
					}
				})
			]
		},
		modulePath: 'fixtures/node_modules',
		copyModules: true
	};

	await t.notThrowsAsync(testRollup(opts, concatSnapshot(t)));
});

test('module import with no copy', async t => {
	const opts = {
		rollup: {
			input: 'fixtures/import-module.js',
			output: {
				format: 'esm',
				sourcemap: true
			},
			plugins: [
				rollupResolve({
					customResolveOptions: {
						moduleDirectory: 'fixtures/node_modules'
					}
				})
			]
		},
		modulePath: 'fixtures/node_modules',
		copyModules: false
	};

	await t.notThrowsAsync(testRollup(opts, concatSnapshot(t)));
});

test('multiple output files', async t => {
	const opts = {
		rollup: {
			input: 'fixtures/import-module.js',
			output: [
				{file: 'fixtures/import-module.mjs', format: 'esm', sourcemap: true},
				{file: 'fixtures/import-module.js', format: 'cjs', sourcemap: true}
			],
			plugins: [
				rollupResolve({
					customResolveOptions: {
						moduleDirectory: 'fixtures/node_modules'
					}
				})
			]
		},
		modulePath: 'fixtures/node_modules'
	};

	await t.notThrowsAsync(testRollup(opts, concatSnapshot(t)));
});
