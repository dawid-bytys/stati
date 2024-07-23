module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['perfectionist'],
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
    '@typescript-eslint/consistent-type-imports': 'error',
    'react/react-in-jsx-scope': 'off',
    'react-native/no-inline-styles': 'off',
  },
};
