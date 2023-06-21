module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: [
    'standard',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:vue/recommended',
    'eslint:recommended',
    'plugin:sonarjs/recommended',
    'plugin:promise/recommended',
    'plugin:nuxt/recommended',
    '@nuxtjs',
    'plugin:nuxt/recommended',
  ],
  plugins: [
    'sonarjs',
  ],
  // add your custom rules here
  rules: {
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 1,
      },
      multiline: {
        max: 1,
      },
    }],
    'sonarjs/cognitive-complexity': 0,
    'linebreak-style': 0,
    'promise/no-nesting': 0,
    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 0,
      },
    ],
    indent: ['error', 2],
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1,
        baseIndent: 0,
        alignAttributesVertically: true,
      },
    ],
    'vue/no-template-shadow': 'error',
    'vue/no-v-html': 'off',
    'vue/padding-line-between-blocks': 'error',
    'vue/require-name-property': 'error',
    'vue/v-on-function-call': 'error',
    'vue/no-reserved-component-names': 'error',
    // 'vue/no-static-inline-styles': [
    //   'error',
    //   {
    //     allowBinding: false,
    //   },
    // ],
    'vue/no-static-inline-styles': 'off',
    'import/no-extraneous-dependencies': 'off',
    'lines-between-class-members': 'error',
    'no-unused-expressions': 'error',
    // 'max-len': ['error', { code: 400 }],
    'no-empty-function': 'error',
    camelcase: 'error',
    'no-shadow': ['error', { allow: ['state', 'getters'] }],
    'no-param-reassign': ['error', { ignorePropertyModificationsFor: ['state'] }],
    'import/extensions': 0,
    'arrow-body-style': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-syntax': 'off',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': [
      'error',
      {
        args: 'none',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
        vars: 'all',
      },
    ],
    'no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
    'no-restricted-globals': 'off',
    'no-bitwise': 'off',
    'func-names': 'off',
    'promise/always-return': 'off',
    'prefer-destructuring': 0,
    // 'vue/max-attributes-per-line': [
    //   'error',
    //   {
    //     singleline: 2,
    //     multiline: {
    //       max: 1,
    //       allowFirstLine: true,
    //     },
    //   },
    // ],
    'vue/order-in-components': [
      'error',
      {
        order: [
          'el',
          'name',
          'key',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          ['provide', 'inject'],
          'ROUTER_GUARDS',
          'layout',
          'middleware',
          'validate',
          'scrollToTop',
          'transition',
          'loading',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'emits',
          'setup',
          'asyncData',
          'data',
          'fetch',
          'head',
          'computed',
          'watch',
          'watchQuery',
          'LIFECYCLE_HOOKS',
          'methods',
          ['template', 'render'],
          'renderError',
        ],
      },
    ],
    'no-alert': 'off',
    // 'no-console': 0,
    'no-eval': 'error',
    'no-extend-native': 0,
    curly: ['error', 'all'],
    'no-else-return': 0,
    // 'no-empty-function': 'error',
    'no-eq-null': 'error',
    'no-extra-parens': 'error',
    'no-labels': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-loss-of-precision': 'error',
    // 'class-methods-use-this': 'off',
    'max-classes-per-file': ['error', 1],
    'no-constructor-return': 'error',
    'no-promise-executor-return': 'error',
    'array-callback-return': 'error',
    'no-extra-bind': 'error',
    'no-implicit-coercion': 'error',
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-invalid-this': 'off',
    'no-lone-blocks': 'error',
    'no-multi-spaces': 'error',
    'no-return-await': 'error',
    'no-self-compare': 'error',
    // 'no-unused-expressions': [
    //     'error',
    //     {
    //         allowTernary: true,
    //     },
    // ],
    // 'no-unused-vars': [
    //     'error',
    //     {
    //         vars: 'local',
    //         args: 'none',
    //         caughtErrors: 'none',
    //     },
    // ],
    'no-useless-call': 'error',
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'no-void': 'error',
    radix: 'error',
    // 'require-await': 'off',
    'wrap-iife': ['error', 'inside'],
    'no-label-var': 'error',
    'no-undef-init': 'error',
    // 'no-use-before-define': [
    //     'error',
    //     {
    //         functions: false,
    //         classes: false,
    //     },
    // ],
    'array-bracket-newline': ['error', 'consistent'],
    'array-bracket-spacing': ['error', 'never'],
    'array-element-newline': ['error', 'consistent'],
    'brace-style': ['error', '1tbs'],
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    'comma-style': ['error', 'last'],
    'computed-property-spacing': ['error', 'never'],
    'consistent-this': ['error', 'self'],
    'eol-last': ['error', 'always'],
    'func-call-spacing': ['error', 'never'],
    'func-name-matching': 'error',
    'func-style': [
      'error',
      'declaration',
      {
        allowArrowFunctions: true,
      },
    ],
    'function-call-argument-newline': ['error', 'never'],
    'function-paren-newline': ['error', 'multiline'],
    'implicit-arrow-linebreak': ['error', 'beside'],
    // indent: [
    //     'error',
    //     4,
    //     {
    //         SwitchCase: 1,
    //     },
    // ],
    'jsx-quotes': ['error', 'prefer-double'],
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode: 'strict',
      },
    ],
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    // 'linebreak-style': [
    //     'error',
    //     'unix',
    // ],
    // 'lines-between-class-members': [
    //     'error',
    //     'always',
    //     {
    //         exceptAfterSingleLine: true,
    //     },
    // ],
    'multiline-comment-style': ['error', 'separate-lines'],
    'multiline-ternary': ['error', 'always-multiline'],
    // 'new-cap': [
    //     'error',
    //     {
    //         newIsCap: true,
    //         capIsNew: true,
    //         properties: false,
    //     },
    // ],
    'new-parens': ['error', 'always'],
    'newline-per-chained-call': 'error',
    'no-array-constructor': 'error',
    'no-inline-comments': 0,
    'no-lonely-if': 'error',
    'no-mixed-operators': 'off',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
        maxEOF: 0,
        maxBOF: 0,
      },
    ],
    'no-new-object': 'error',
    'no-tabs': 'error',
    'no-unneeded-ternary': 'error',
    'no-whitespace-before-property': 'error',
    'nonblock-statement-body-position': ['error', 'beside'],
    'object-curly-newline': [
      'error',
      {
        consistent: true,
      },
    ],
    'object-curly-spacing': ['error', 'always'],
    'object-property-newline': [
      'error',
      {
        allowMultiplePropertiesPerLine: true,
      },
    ],
    'one-var': ['error', 'never'],
    'one-var-declaration-per-line': ['error', 'initializations'],
    'operator-assignment': ['error', 'always'],
    'padded-blocks': ['error', 'never'],
    'quote-props': ['error', 'as-needed'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'semi-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    'semi-style': ['error', 'last'],
    'space-before-blocks': 'error',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'space-in-parens': ['error', 'never'],
    'space-unary-ops': 'error',
    'spaced-comment': [
      'error',
      'always',
      {
        exceptions: ['-+'],
      },
    ],
    'switch-colon-spacing': 'error',
    // ECMAScript 6
    // 'arrow-body-style': [
    //     'error',
    //     'as-needed',
    // ],
    // 'arrow-parens': [
    //   'error',
    //   'as-needed',
    // ],
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'generator-star-spacing': [
      'error',
      {
        before: false,
        after: true,
        anonymous: 'neither',
        method: {
          before: true,
          after: true,
        },
      },
    ],
    'no-duplicate-imports': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-constructor': 'error',
    'no-useless-rename': 'error',
    'no-var': 'error',
    // 'prefer-const': 'error',
    'rest-spread-spacing': ['error', 'never'],
    'template-curly-spacing': ['error', 'never'],
    // Vue linter optoins
    'vue/attribute-hyphenation': [
      'error',
      'always',
      {
        ignore: ['viewBox'],
      },
    ],
    'vue/custom-event-name-casing': 'off',
    'vue/html-closing-bracket-newline': 'error',
    // 'vue/html-indent': [
    //     'error',
    //     4,
    //     {
    //         attribute: 1,
    //         baseIndent: 1,
    //         closeBracket: 0,
    //         alignAttributesVertically: true,
    //         ignores: [],
    //     },
    // ],
    // 'vue/max-attributes-per-line': [
    //     'error',
    //     {
    //         singleline: 2,
    //         multiline: {
    //             max: 1,
    //             allowFirstLine: true,
    //         },
    //     },
    // ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any',
          normal: 'any',
          component: 'any',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/multiline-html-element-content-newline': [
      'error',
      {
        ignoreWhenEmpty: false,
        allowEmptyLines: true,
      },
    ],
    // 'vue/script-indent': [
    //     'error',
    //     4,
    //     {
    //         baseIndent: 0,
    //         switchCase: 1,
    //         ignores: [],
    //     },
    // ],
    'vue/name-property-casing': ['error', 'PascalCase'],
    // 'vue/no-v-html': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/no-reserved-keys': 'off',

    // Enforce import order
    'import/order': 'error',

    // Imports should come first
    'import/first': 'error',

    // Other import rules
    'import/no-mutable-exports': 'error',

    // Allow unresolved imports
    'import/no-unresolved': 'off',

    // Allow paren-less arrow functions only when there's no braces
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],

    // Allow async-await
    // 'generator-star-spacing': 'off',

    // Allow debugger during development
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

    // Prefer const over let
    'prefer-const': ['error', {
      destructuring: 'any',
      ignoreReadBeforeAssign: false,
    }],

    // No single if in an "else" block
    // 'no-lonely-if': 'error',

    // Force curly braces for control flow,
    // including if blocks with a single statement
    // curly: ['error', 'all'],

    // No async function without await
    'require-await': 'error',

    // Force dot notation when possible
    'dot-notation': 'error',

    // 'no-var': 'error',

    // Force object shorthand where possible
    'object-shorthand': 'error',
  },
};
