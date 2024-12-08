import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs}"]},
  {languageOptions: { 
    globals: {
      ...globals.browser,
      ...globals.mocha, 
    }
  }},
  pluginJs.configs.recommended,
  {
    env: {
      es2021: true, // Allow modern ECMAScript features
      browser: true, // For browser globals like window, document, etc.
      mocha: true, // Add Mocha environment
    },
  },
];