const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSASS = new ExtractTextPlugin('styles.css');

const config = env => ({
  devtool: env.prod ? undefined : 'eval-source-map',

  entry: [
    './app/index.js',
    './style/main.scss',
  ],

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/generated'),
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.scss', '.css'],
    root: [ path.resolve(__dirname, 'app/') ],
  },

  module: {
    loaders: [
      { test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: { presets: ['es2015-webpack', 'react', 'stage-2'] } },
      { test: /\.scss$/,
        loader: extractSASS.extract('style-loader', 'css!sass') },
    ]
  },

  plugins: [
    extractSASS,
  ],
});

module.exports = config;