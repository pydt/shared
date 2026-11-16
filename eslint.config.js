// @ts-check
// ESLint flat config (angular-eslint 22 no longer reads .eslintrc.json). Merges the old root and
// projects/pydt-shared-lib .eslintrc.json files with the same rules. The "node/..." rules they turned
// off are gone because that plugin was never loaded, and flat config rejects rules from unloaded plugins.
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const prettierRecommended = require("eslint-plugin-prettier/recommended");

const LIB = "projects/pydt-shared-lib";

module.exports = tseslint.config(
  {
    ignores: [`${LIB}/src/lib/_gen/**`, `${LIB}/src/test.ts`, `${LIB}/src/countdownjs/**`, "dist/**"],
  },
  {
    // The old config didn't report stale eslint-disable comments; keep it that way
    linterOptions: { reportUnusedDisableDirectives: "off" },
  },
  {
    files: ["**/*.ts"],
    extends: [...tseslint.configs.recommendedTypeChecked, ...angular.configs.tsRecommended, prettierRecommended],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      "class-methods-use-this": ["off"],
      "comma-dangle": ["error", "always-multiline"],
      "func-style": ["error", "expression"],
      indent: ["error", 2, { SwitchCase: 1 }],
      "lines-around-comment": ["off"],
      semi: ["error", "always"],
      "new-cap": ["off"],
      "no-invalid-this": ["off"],
      "no-new": ["off"],
      "no-useless-constructor": ["off"],
      "@angular-eslint/component-selector": ["error", { prefix: "pydt", style: "kebab-case", type: "element" }],
      "@angular-eslint/directive-selector": ["error", { prefix: "pydt", style: "camelCase", type: "attribute" }],
      "@angular-eslint/prefer-standalone": ["off"],
      "@angular-eslint/prefer-inject": ["off"],
      // New in angular-eslint 22. The Angular 22 migration pinned every component to
      // ChangeDetectionStrategy.Eager to keep today's behavior; moving to OnPush is its own project.
      "@angular-eslint/prefer-on-push-component-change-detection": ["off"],
    },
  },
  {
    // Library code and specs use the library's own tsconfigs (specs need the Jasmine types)
    files: [`${LIB}/**/*.ts`],
    ignores: [`${LIB}/**/*.spec.ts`],
    languageOptions: {
      parserOptions: { projectService: false, project: [`${LIB}/tsconfig.lib.json`], tsconfigRootDir: __dirname },
    },
  },
  {
    files: [`${LIB}/**/*.spec.ts`],
    languageOptions: {
      parserOptions: { projectService: false, project: [`${LIB}/tsconfig.spec.json`], tsconfigRootDir: __dirname },
    },
  },
  {
    files: ["**/*.html"],
    extends: [...angular.configs.templateRecommended],
    rules: {},
  },
  {
    files: ["**/*.html"],
    ignores: ["**/*inline-template-*.component.html"],
    extends: [prettierRecommended],
    rules: {
      "prettier/prettier": ["error", { parser: "angular" }],
    },
  },
);
