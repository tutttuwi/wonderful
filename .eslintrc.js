module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended', //ESLintで基本的なルールチェック(更に細かく個別指定可)
    'plugin:prettier/recommended' //一番下に書かないとうまく動かない場合も
  ],
  plugins: [],
  // ここにカスタムルールを追加します。
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true, //シングルクォーテーションのフォーマット 参考）https://prettier.io/docs/en/options.html#quotes
        semi: true, //セミコロンのフォーマット 参考）https://prettier.io/docs/en/options.html#semicolons
        printWidth: 100
      }
    ],
    // <ESLINT> 個別定義
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'linebreak-style': ['error', 'windows']
  }
};
