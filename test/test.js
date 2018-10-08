import test from 'ava';

import pEvent from 'p-event';
import pump from 'pump';
import concat from 'concat-stream';
import rollupResolve from 'rollup-plugin-node-resolve';
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

function vinylSnapshot({contents, relative, sourceMap}) {
	return {
		contents: contents.toString(),
		relative,
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
				{format: 'es'},
				{format: 'es'}
			]
		}
	}));
	await t.throwsAsync(testRollup({
		rollup: {
			input: 'fixtures/input1.js',
			output: {
				format: 'es'
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
				format: 'es'
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
				format: 'es',
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
				format: 'es',
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
				format: 'es',
				sourcemap: true
			},
			plugins: [
				rollupResolve({
					customResolveOptions: {
						moduleDirectory: 'fixtures/fake-node-modules'
					}
				})
			]
		},
		modulePath: 'fixtures/fake-node-modules'
	};
	await t.notThrowsAsync(testRollup(opts, concatSnapshot(t)));
});

test('module import and copy all files', async t => {
	const opts = {
		rollup: {
			input: 'fixtures/import-module.js',
			output: {
				format: 'es',
				sourcemap: true
			},
			plugins: [
				rollupResolve({
					customResolveOptions: {
						moduleDirectory: 'fixtures/fake-node-modules'
					}
				})
			]
		},
		modulePath: 'fixtures/fake-node-modules',
		copyModules: true
	};

	await t.notThrowsAsync(testRollup(opts, concatSnapshot(t)));
});

test('module import and copy all files with vinylOpts', async t => {
	const opts = {
		rollup: {
			input: 'fixtures/import-module.js',
			output: {
				format: 'es',
				sourcemap: true,
				vinylOpts: {
					base: 'fixtures'
				}
			},
			plugins: [
				rollupResolve({
					customResolveOptions: {
						moduleDirectory: 'fixtures/fake-node-modules'
					}
				})
			]
		},
		modulePath: 'fixtures/fake-node-modules',
		copyModules: true
	};

	await t.notThrowsAsync(testRollup(opts, concatSnapshot(t)));
});

test('module import with no copy', async t => {
	const opts = {
		rollup: {
			input: 'fixtures/import-module.js',
			output: {
				format: 'es',
				sourcemap: true
			},
			plugins: [
				rollupResolve({
					customResolveOptions: {
						moduleDirectory: 'fixtures/fake-node-modules'
					}
				})
			]
		},
		modulePath: 'fixtures/fake-node-modules',
		copyModules: false
	};

	await t.notThrowsAsync(testRollup(opts, concatSnapshot(t)));
});

test('multiple output files', async t => {
	const opts = {
		rollup: {
			input: 'fixtures/import-module.js',
			output: [
				{file: 'fixtures/import-module.mjs', format: 'es', sourcemap: true},
				{file: 'fixtures/import-module.js', format: 'cjs', sourcemap: true}
			],
			plugins: [
				rollupResolve({
					customResolveOptions: {
						moduleDirectory: 'fixtures/fake-node-modules'
					}
				})
			]
		},
		modulePath: 'fixtures/fake-node-modules'
	};

	await t.notThrowsAsync(testRollup(opts, concatSnapshot(t)));
});
