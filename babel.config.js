/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

require('dotenv').config();

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true,
        },
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
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
