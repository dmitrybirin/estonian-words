module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module'
	},
	root: true,
	extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module'
	},
	settings: {
		react: {
			version: 'detect'
		}
	},
	root: true,
	env: {
		node: true,
		jest: true
	},
	rules: {
		'react/prop-types': 0,
		'@typescript-eslint/explicit-module-boundary-types': 0
	}
};
