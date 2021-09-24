/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const glob = require('glob');

const files = {};
glob.sync('./frontend/entrypoints/*.tsx').forEach((s) => {
  files[s.split('/').slice(-1)[0].replace('.tsx', '')] = s;
});

const ts = {
  test: /\.tsx?$/,
  loader: 'babel-loader',
};

const css = {
  test: /\.css$/i,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
    },
  ],
  exclude: /\.module\.css$/,
};

const css_modules = {
  test: /\.css$/i,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        import: false,
        modules: {
          localIdentName: '[local]_[hash:base64:5]',
        },
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
  mode: 'development',
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
    rules: [ts, css_modules, css, svg],
  },
  optimization: {
    minimize: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './resources/static/dist'),
    },
    compress: true,
    port: 3000,
  },
  watchOptions: {
    poll: 500,
  },
};
