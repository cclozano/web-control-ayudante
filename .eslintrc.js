module.exports = {
    parser: 'babel-eslint',
    env: {
        es6: true,
        node: true,
        browser: true,
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['react'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
    ],
    rules: {
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        'react/prop-types': 'off',
        'react/display-name': 'off',
        'no-control-regex': 0,
    },
};
