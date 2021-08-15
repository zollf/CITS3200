const path = require('path');
const glob = require('glob');

const files = {};
glob.sync('./frontend/entrypoints/*.tsx').forEach((s) => {
  files[s.split('/').slice(-1)[0].replace('.tsx', '')] = s;
});

module.exports = {
  entry: { 
    ...files,
    styles: glob.sync('./frontend/**/*.css'),
  },
  output: {
    path: path.resolve(__dirname, './app/resources/static/dist'),
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
        }
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader", 
          {
            loader: "css-loader",
            options: {
              import: false,
              modules: true
            },
          }
        ],
        include: /\.module\.css$/
      },
    ]
  },
  optimization: {
    minimize: true
  }
};
