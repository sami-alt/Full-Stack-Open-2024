import globals from 'globals';
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin-js'

export default [
  js.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic
    },
    // 'overrides': [
    //   {
    //     'env': {
    //       'node': true
    //     },
    //     'files': [
    //       '.eslintrc.{js,cjs}'
    //     ],
    //     'parserOptions': {
    //       'sourceType': 'script'
    //     }
    //   }
    // ],
    // 'parserOptions': {
    //   'ecmaVersion': 'latest'
    // },
    // 'rules': {
    // },
    // 'plugins': [
    //   '@stylistic/js'
    // ],
    // 'extends': 'eslint:recommended',
    'rules': {
      '@stylistic/indent': [
        'error',
        2
      ],
      '@stylistic/linebreak-style': [
        'error',
        'unix'
      ],
      '@stylistic/quotes': [
        'error',
        'single'
      ],
      '@stylistic/semi': [
        'error',
        'never'
      ],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true }
      ],
      'no-console': 0
    },

    'ignores': ['.dist/**/*']

  }
]

