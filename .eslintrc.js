module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/recommended',
    '@vue/standard'
  ],
  rules: {
    'brace-style': [
      2,
      'stroustrup',
      {
        allowSingleLine: true
      }
    ],
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
        MemberExpression: 0
      }
    ],
    'no-console': 'off',
    'vue/no-v-html': 'off',
    'vue/html-closing-bracket-newline': 0,
    'vue/max-attributes-per-line': 0,
    'vue/no-parsing-error': [
      2,
      {
        'invalid-first-character-of-tag-name': false
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
