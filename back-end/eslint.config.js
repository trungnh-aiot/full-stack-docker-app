import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";

export default defineConfig([
  // Base JS rules
  js.configs.recommended,

  // For JS files
  {
    files: ["**/*.{js,mjs,cjs}"],
    ignores: ["**/node_modules/**", "**/prisma/**", "**/dist/**", "**/.env"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      ecmaVersion: 2022,
      sourceType: "module",
    },
    plugins: {
      prettier: eslintPluginPrettier,
      "simple-import-sort": eslintPluginSimpleImportSort,
    },
    rules: {
      // Code style
      semi: ["error", "always"],
      "no-console": "warn",
      "arrow-body-style": ["error", "as-needed"],
      "prefer-template": "error",
      "no-var": "error",
      "prefer-const": "error",
      "object-shorthand": "warn",
      "max-len": ["warn", { code: 100 }],
      "no-multiple-empty-lines": ["warn", { max: 1 }],

      // Prettier formatting
      "prettier/prettier": "warn",

      // Import sorting
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },

  // Prettier last to disable conflicting rules
  {
    name: "prettier-override",
    rules: prettier.rules,
  },
]);
