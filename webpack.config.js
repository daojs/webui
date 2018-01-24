module.exports = {
  devtool: 'source-map',
  entry: [
    'react-hot-loader/patch',
    './src/index.js',
  ],
  output: {
    filename: './dist/bundle.js',
  },
  devServer: {
    contentBase: './',
    port: 8000,
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader' },
      { test: /\.css/, loader: ['style-loader', 'css-loader'] },
    ],
  },
};
