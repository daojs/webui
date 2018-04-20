const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'react-hot-loader/patch',
    './src/index.js',
  ],
  output: {
    path: `${__dirname}/dist`,
    filename: './bundle.js',
    // Config for dev server
    // Without this config, the bundle would be served at /bundle.js
    // With this config, the bundle would be served at /dist/bundle.js
    publicPath: '/dist/',
  },
  devServer: {
    contentBase: './',
    port: 8080,
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      // { test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader' },
      { test: /\.css/, loader: ['style-loader', 'css-loader'] },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'node_modules/monaco-editor/min/vs',
        to: 'vs',
      },
    ]),
  ],
};
