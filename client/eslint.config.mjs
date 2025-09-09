import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,jsx}"],
        languageOptions: { globals: globals.browser },
        plugins: {
            react: pluginReact,
            prettier: pluginPrettier,
        },
        extends: [
            js.configs.recommended,
            pluginReact.configs.flat.recommended,
            "plugin:prettier/recommended",
        ],
        rules: {
            "prettier/prettier": "error",
        },
    },
]);