module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	plugins: [
		"@typescript-eslint",
		"react-hooks"
	],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
	],
	globals: {
		"module": "writable",
	},
	rules: {
		"@typescript-eslint/ban-types": "off",
		"indent": [
			"error",
			"tab",
			{ "SwitchCase": 1 }
		],
		"linebreak-style": "off",
		"no-constant-condition": [
			"error",
			{ "checkLoops": false }
		],
		"no-extra-semi": "off",
		"no-unused-vars": [
			"off",
			{ "varsIgnorePattern": "(props|state)" }
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"space-before-function-paren": [
			"error",
			"never"
		],
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",

		"no-console": 2
	},
};