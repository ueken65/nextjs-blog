module.exports = {
  extends: [
    'eslint:recommended', // お好きなESLint設定をここに
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [
      'react',
      '@typescript-eslint',
      'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // react用
    },
  },
  env: {
    browser: true, // 事前に定義済みの条件を設定。例えばjestを入れないと`describe`や`it`が未定義の参照でlintにひっかかる
    jest: true,
    es6: true,
    node: true,
  },
  rules: {
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    'no-unused-vars': 'off',
    'jsx-quotes': ['error', 'prefer-double'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
      },
    ],
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: 'React', // Pragma to use, default to "React"
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
      flowVersion: '0.53', // Flow version
    },
    propWrapperFunctions: [
      // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
      'forbidExtraProps',
      {
        property: 'freeze',
        object: 'Object',
      },
      {
        property: 'myFavoriteWrapper',
      },
    ],
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      'Hyperlink',
      {
        name: 'Link',
        linkAttribute: 'to',
      },
    ],
  },
}