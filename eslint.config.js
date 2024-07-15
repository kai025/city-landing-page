const typescriptParser = require("@typescript-eslint/parser");
const typescriptPlugin = require("@typescript-eslint/eslint-plugin");
const reactPlugin = require("eslint-plugin-react");
const reactHooksPlugin = require("eslint-plugin-react-hooks");

/** @type {import('eslint').FlatConfig[]} */
const config = [
  {
    files: ["*.ts", "*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        browser: true,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      "@typescript-eslint/ban-ts-comment": "warn",
      "comma-dangle": "off",
      "multiline-ternary": "off",
      "no-use-before-define": "off",
      "space-before-function-paren": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      "react/display-name": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    files: ["*.jsx", "*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        browser: true,
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      "comma-dangle": "off",
      "multiline-ternary": "off",
      "no-use-before-define": "off",
      "space-before-function-paren": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      "react/display-name": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
];

module.exports = config;
