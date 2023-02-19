module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    // 'plugin:react/recommended',  // Uses the recommended rules from @eslint-plugin-react
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
  ],
  // extends: [
  //   'airbnb-base',
  // ],
  // globals: {
  //   Atomics: 'readonly',
  //   SharedArrayBuffer: 'readonly',
  // },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
  },
  // rules: {
  //   'import/no-extraneous-dependencies': [
  //     'error',
  //     {
  //       devDependencies: true,
  //     },
  //   ],
  // },
};
