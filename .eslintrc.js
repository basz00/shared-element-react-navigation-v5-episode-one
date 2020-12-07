module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: [
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'prettier',
		'prettier/@typescript-eslint',
	],
	plugins: [
		'@typescript-eslint',
		'jest',
		'react-hooks',
		'prettier',
		'react-native',
	],
	settings: {
		'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		react: {
			version: 'detect',
		},
	},
	env: {
		jest: true,
		'react-native/react-native': true,
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
	},
	rules: {
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'prettier/prettier': ['error', {endOfLine: 'auto'}],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'react-native/no-unused-styles': 2,
		'react-native/no-inline-styles': 2,
		'react-native/no-color-literals': 2,
	},
};
