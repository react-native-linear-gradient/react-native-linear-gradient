module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['import', 'simple-import-sort'],
  rules: {
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^\\u0000'], // Side effect imports
          ['^react(-native)?$'], // Imports from react and react-native
          ['^@?\\w'], // Other npm package imports
          ['^'], // Absolute imports
          ['^\\.'], // Relative imports
        ],
      },
    ],
  },
};
