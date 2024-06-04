import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.browser,
    },
    rules: {
      "no-console": "warn", // Add this line to set the console log warning
    },
  },
  pluginJs.configs.recommended,
];
