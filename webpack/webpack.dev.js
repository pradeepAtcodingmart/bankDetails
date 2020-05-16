const webpack = require('webpack');

const commonPaths = require('./paths');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('../src/config.development.json');
const Console = require('../src/services/console.jsx');

module.exports = {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: commonPaths.outputPath,
    chunkFilename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              strictMath: true,
              noIeCompat: true
            }
          }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: commonPaths.outputPath,
    compress: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      config: JSON.stringify(config),
      Console: Console.dev
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false
    })
  ]
};
