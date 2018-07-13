export default {
	require: [
		'@babel/register'
	],
	extensions: ['js'],
	babel: {
		extensions: ['mjs'],
		testOptions: {
			babelrc: false
		}
	},
	compileEnhancements: false
};
