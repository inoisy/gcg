module.exports = {
  // customSyntax: 'postcss-html',
  extends: [
    'stylelint-config-standard',
    // 'stylelint-config-recommended-vue',
    'stylelint-config-css-modules',
  ],
  plugins: ['stylelint-scss', 'stylelint-order'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'at-rule-empty-line-before': [
      'always',
      {
        except: [
          'blockless-after-same-name-blockless',
          'first-nested',
        ],
        ignore: [
          'after-comment',
        ],
        ignoreAtRules: [
          'if',
          'else',
        ],
      },
    ],
    'rule-empty-line-before': [
      'always',
      {
        except: [
          'first-nested',
        ],
        ignore: [
          'after-comment',
        ],
      },
    ],
    'comment-empty-line-before': 'always',
    'block-closing-brace-newline-before': 'always',
    'block-closing-brace-newline-after': [
      'always',
      {
        ignoreAtRules: [
          'if',
          'else',
        ],
      },
    ],
    // TODO back this to true
    'declaration-no-important': null,
    'no-descending-specificity': null,
    'value-no-vendor-prefix': true,
    // TODO add -webkit-box to ignored prefixes
    'selector-no-vendor-prefix': true,
    'selector-pseudo-element-colon-notation': 'single',
    indentation: [
      2,
      {
        baseIndentLevel: 1,
      },
    ],
    'number-leading-zero': 'never',
    'order/properties-order': [
      'content',
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'visibility',
      'box-sizing',
      'overflow',
      'overflow-x',
      'overflow-y',
      'display',
      'align-items',
      'justify-content',
      'align-content',
      'align-self',
      'flex',
      'flex-flow',
      'flex-grow',
      'flex-shrink',
      'flex-wrap',
      'order',
      'float',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'border-radius',
      'border',
      'border-color',
      'border-style',
      'border-width',
      'border-top',
      'border-top-color',
      'border-top-style',
      'border-top-width',
      'border-right',
      'border-right-color',
      'border-right-style',
      'border-right-width',
      'border-bottom',
      'border-bottom-color',
      'border-bottom-style',
      'border-bottom-width',
      'border-left',
      'border-left-color',
      'border-left-style',
      'border-left-width',
      'border-spacing',
      'background',
      'background-attachment',
      'background-clip',
      'background-color',
      'background-image',
      'background-origin',
      'background-position',
      'background-repeat',
      'background-size',
      'clip',
      'outline',
      'outline-color',
      'outline-offset',
      'outline-style',
      'outline-width',
      'list-style',
      'list-style-image',
      'list-style-position',
      'list-style-type',
      'columns',
      'column-count',
      'column-fill',
      'column-gap',
      'column-rule',
      'column-rule-color',
      'column-rule-style',
      'column-rule-width',
      'column-span',
      'column-width',
      'vertical-align',
      'text-align',
      'text-align-last',
      'text-decoration',
      'text-decoration-color',
      'text-decoration-line',
      'text-decoration-style',
      'text-indent',
      'text-justify',
      'text-overflow',
      'text-shadow',
      'text-transform',
      'white-space',
      'word-beak',
      'word-spacing',
      'word-wrap',
      'font',
      'font-family',
      'font-size',
      'font-weight',
      'font-style',
      'font-variant',
      'line-height',
      'letter-spacing',
      'color',
      'opacity',
      'transform',
      'transform-origin',
      'transition',
      'transition-delay',
      'transition-duration',
      'transition-property',
      'transition-timing-function',
      'animation',
      'animation-name',
      'animation-duration',
      'animation-delay',
      'animation-fill-mode',
      'animation-direction',
      'animation-iteration-count',
      'animation-play-state',
      'animation-timing-function',
      'cursor',
    ],
    'color-function-notation': 'legacy',

  },
};
