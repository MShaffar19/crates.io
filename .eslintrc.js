module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  plugins: ['ember', 'prettier', 'import-helpers'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {
    // it's fine to use `return` without a value and rely on the implicit `undefined` return value
    'getter-return': 'off',

    'prettier/prettier': 'error',

    'ember/no-classic-classes': 'error',
    'ember/no-empty-attrs': 'off',
    'ember/require-computed-property-dependencies': 'off',

    // disabled because we need `null` since JSON has no `undefined`
    'unicorn/no-null': 'off',
    // disabled because this rule conflicts with prettier
    'unicorn/no-nested-ternary': 'off',
    // disabled because of unfixable false positives
    'unicorn/prevent-abbreviations': 'off',
    // disabled because it seems unnecessary
    'unicorn/prefer-number-properties': 'off',
    // disabled because it seems unnecessary
    'unicorn/prefer-reflect-apply': 'off',
    'unicorn/filename-case': ['error', { case: 'kebabCase', ignore: ['^-'] }],

    'import-helpers/order-imports': [
      'error',
      {
        newlinesBetween: 'always',
        groups: [
          // Node.js built-in modules
          '/^(assert|async_hooks|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|http2|https|inspector|module|net|os|path|perf_hooks|process|punycode|querystring|readline|repl|stream|string_decoder|timers|tls|trace_events|tty|url|util|v8|vm|zli)/',
          // Testing modules
          ['/^(qunit|ember-qunit|@ember/test-helpers|ember-exam|htmlbars-inline-precompile)$/', '/^ember-exam\\//'],
          // Ember.js modules
          ['/^@(ember|ember-data|glimmer)\\//', '/^(ember|ember-data|rsvp)$/', '/^ember-data\\//'],
          ['module'],
          [`/^${require('./package.json').name}\\//`],
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
  overrides: [
    // test files
    {
      files: ['tests/**/*.js'],
      rules: {
        // disabled because of our nested `prepare()` functions
        'unicorn/consistent-function-scoping': 'off',
      },
    },

    // mirage files
    {
      files: ['mirage/**/*.js'],
      rules: {
        // disabled because of different `.find()` meaning
        'unicorn/no-fn-reference-in-iterator': 'off',
      },
    },

    // node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'fastboot.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'lib/*/index.js',
        'server/**/*.js',
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2018,
      },
      env: {
        browser: false,
        node: true,
      },
    },
  ],
};
