const WebpackMerge = require('webpack-merge');
const base = require('./webpack.base');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DropConsoleWebpackPlugin = require('drop-console-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');



var path = require('path');
const cwd = process.cwd();

module.exports = WebpackMerge(base, {
  // mode: 'production',
  mode: 'development',
  entry: {
    demo: './app.js',
    ui: './packages/index.js'
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(cwd, 'dist'),
  },
  module: {
    rules: [{
      test: /\.(le|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader', 'postcss-loader', 'less-loader'
      ]
    }]
  },
  optimization: {
    splitChunks: {
      // chunks: 'async',
      // minSize: 30000,
      // minChunks: 1,
      // maxAsyncRequests: 5,
      // maxInitialRequests: 3,
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "async",
          minChunks: 1
        },
        styles: {
          name: 'styles',
          test: /\.scss|css$/,
          chunks: 'async', // 将多个css chunk合并成一个css文件
          enforce: true
        }
      }
    }
  },
  plugins: [
    new DropConsoleWebpackPlugin({
      drop_log: true,
      drop_info: true,
      drop_warn: false,
      drop_error: false,
      exclude: [], //排除不必要的chunk，减少build时间
    }),
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
      chunkFilename: '[hash].css',
    }),
    new OptimizeCSSAssetsPlugin()
  ],
})