const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "prettier",
    "eslint-config-turbo",
    ...[
      "@vercel/style-guide/eslint/node",
      "@vercel/style-guide/eslint/browser",
      "@vercel/style-guide/eslint/typescript",
      "@vercel/style-guide/eslint/react",
      "@vercel/style-guide/eslint/next",
    ].map(require.resolve),
  ],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  plugins: ["simple-import-sort"],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
  ],
  overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],
  rules: {
    "import/no-default-export": "off",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        pathGroups: [
          {
            pattern: "@/**",
            group: "internal",
          },
        ],
      },
    ],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-non-null-assertion": "warn",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
  },
};
