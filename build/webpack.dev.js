const webpack = require('webpack');
const WebpackMerge = require('webpack-merge');
const base = require('./webpack.base');

const fs = require('fs');
var path = require('path');
const cwd = process.cwd();

const postcss = require(path.join(cwd, 'postcss.config'));

module.exports = WebpackMerge(base, {
  mode: 'development',
  entry: './app.js',
  output: {
    filename: 'build.js',
    path: path.resolve(cwd, 'dist'),
  },
  module: {
    // // 解决动态js url警告错误
    // // require
    // unknownContextRegExp: /$^/,
    // unknownContextCritical: false,

    // // require(expr)
    // exprContextRegExp: /$^/,
    // exprContextCritical: false,

    // // require("prefix" + expr + "surfix")
    // wrappedContextRegExp: /$^/,
    // wrappedContextCritical: false,

    rules: [{
      test: /\.(le|c)ss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: postcss
        },
        {
          loader: 'less-loader',
          query: {
            sourceMap: true,
            globalVars: {
              "boxWidth": '200px'
            },
            modifyVars: {
              "boxHeight": '200px'
            }
          }
        }
      ]
    }, {
      test: /\.s(c|a)ss$/,
      use: [
        'vue-style-loader', // creates style nodes from JS strings
        "css-loader", // translates CSS into CommonJS
        {
          loader: 'postcss-loader',
          options: postcss
        },
        {
          loader: "sass-loader",
          options: {
            data: ""
          }
        } // compiles Sass to CSS, using Node Sass by default
      ]
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: path.join(cwd, 'dist'),
    open: true,
    host: '0.0.0.0',
    port: 9011,
    hot: true,
    compress: false,
    inline: true,
    https: {
      cert: fs.readFileSync("./localhost+4.pem"),
      key: fs.readFileSync("./localhost+4-key.pem"),
      cacert: fs.readFileSync("./localhost+4.pem")
    }
  },
  watchOptions: {
    ignored: [path.resolve(cwd, 'dist/**/*.*'), path.resolve(cwd, 'node_modules')]
  }
});