'use strict';

module.exports = {
	presets: [['@babel/env', {
		targets: {
			node: 8
		}
	}]],
	env: {
		test: {
			plugins: ['istanbul']
		}
	}
};
