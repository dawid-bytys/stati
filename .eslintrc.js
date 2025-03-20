module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: [
        '@react-native',
        'prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    plugins: ['perfectionist', '@typescript-eslint', 'jest'],
    rules: {
        'perfectionist/sort-imports': [
            'error',
            {
                type: 'natural',
                order: 'asc',
                'newlines-between': 'never',
                groups: [
                    'react',
                    ['builtin', 'external'],
                    'internal',
                    ['parent', 'sibling', 'index'],
                    'side-effect',
                    'style',
                    'object',
                    'unknown',
                    'internal-type',
                    'type',
                ],
            },
        ],
        'consistent-return': 'error',
        'react/react-in-jsx-scope': 'off',
        'react-native/no-inline-styles': 'off',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-empty-object-type': 'off',
    },
};
