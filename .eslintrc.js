module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    ecmaVersion: 2017,
    ecmaFeatures: {
      jsx: false,
      impliedStrict: true
    }
  },
  plugins: ["@typescript-eslint", "vue", "prettier", "import", "jsdoc"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
    "prettier",
    "prettier/vue",
    "prettier/@typescript-eslint"
  ],
  rules: {
    "@typescript-eslint/no-var-requires": "off",
    "no-case-declarations": "off",
    "no-undef": "off",
    "prettier/prettier": ["warn", {
      "printWidth": 80,
      "tabWidth": 2,
      "useTabs": false,
      "semi": true,
      "singleQuote": false,
      "trailingComma": "none",
      "bracketSpacing": true,
      "jsxBracketSameLine": false,
      "fluid": false,
      "jsxSingleQuote": false
    }],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "import/no-unresolved": 0,
    "import/no-unassigned-import": 0,
    indent: "off",
    "@typescript-eslint/indent": "off",
    "arrow-parens": ["error", "as-needed"],
    complexity: ["error", 20],
    curly: "error",
    "constructor-super": "error",
    eqeqeq: ["error", "smart"],
    "eol-last": "error",
    "guard-for-in": "error",
    "@typescript-eslint/interface-name-prefix": ["error", "always"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true,
        allowHigherOrderFunctions: true,
        allowTypedFunctionExpressions: true
      }
    ],
    "@typescript-eslint/no-parameter-properties": [
      "error",
      {
        allows: ["private", "readonly", "private readonly"]
      }
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/prefer-interface": "off"
  }
};
