module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'no-labels': ['off'],
    'no-unused-vars': ['warn'],
    'comma-dangle': ['error', 'only-multiline'],
    'vue/html-self-closing': ['warn', {
      'html': {
        'void': 'never',
        'normal': 'never',
        'component': 'any'
      },
      'svg': 'never',
      'math': 'never'
    }],
    'vue/no-unused-components': ['warn'],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/no-labels': ['off']
  }
}
