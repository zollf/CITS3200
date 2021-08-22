/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const glob = require('glob');

const files = {};
glob.sync('./frontend/entrypoints/*.tsx').forEach((s) => {
  files[s.split('/').slice(-1)[0].replace('.tsx', '')] = s;
});

const ts = {
  test: /\.tsx?$/,
  loader: 'ts-loader',
};

const css = {
  test: /\.css$/i,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        import: false,
        modules: true,
      },
    },
  ],
  include: /\.module\.css$/,
};

const svg = {
  test: /\.svg$/,
  use: [
    {
      loader: 'babel-loader',
    },
    {
      loader: 'react-svg-loader',
      options: {
        jsx: true,
      },
    },
  ],
};

module.exports = {
  entry: {
    ...files,
    styles: glob.sync('./frontend/**/*.css'),
  },
  output: {
    path: path.resolve(__dirname, './app/resources/static/dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': __dirname,
    },
  },
  module: {
    rules: [ts, css, svg],
  },
  optimization: {
    minimize: true,
  },
};
