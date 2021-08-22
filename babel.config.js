/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

require('dotenv').config();

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    [
      '@oscarbarrett/babel-plugin-inline-react-svg',
      {
        root: path.resolve(__dirname),
        alias: {
          '@': [path.resolve(__dirname)],
        },
        svgo: {
          plugins: [{ cleanupIDs: false }],
        },
      },
    ],
  ],
};