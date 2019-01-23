const WebpackMerge = require('webpack-merge');
const webpack = require('webpack');
const base = require('./webpack.base');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var path = require('path');
const cwd = process.cwd();


// the path(s) that should be cleaned
let pathsToClean = [
  'dist'
]

// the clean options to use
let cleanOptions = {
  root: cwd,
  exclude: ['shared.js'],
  verbose: true,
  dry: false
}


const postcss = require(path.join(cwd, 'postcss.config'));

module.exports = WebpackMerge(base, {
  mode: 'production',
  entry: {
    ui: './packages/index.js'
  },
  module: {
    rules: [{
      test: /\.(le|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader', {
          loader: 'postcss-loader',
          options: postcss
        }, {
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
      test: /\.scss$/,
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
            data: ''
          }
        } // compiles Sass to CSS, using Node Sass by default
      ]
    }]
  },
  optimization: {
    minimizer:[
      // 自定义js优化配置，将会覆盖默认配置
      // new UglifyJsPlugin({
      //   exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
      //   cache: true,
      //   parallel: true, // 开启并行压缩，充分利用cpu
      //   sourceMap: false,
      //   extractComments: false, // 移除注释
      //   uglifyOptions: {
      //     compress: {
      //       // unused: true,
      //       // warnings: false,
      //       // drop_debugger: true
      //       warnings: false, // 去掉warning
      //       dead_code: true, // 去掉不可达
      //       pure_funcs: ['console.log'],// 发布时不被打包的函数
      //       drop_debugger: true,// 发布时去除debugger
      //       drop_console: true, // 发布时去除console
      //     },
      //     output: {
      //       comments: false
      //     }
      //   }
      // }),
      // 用于优化css文件
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          safe: true,
          autoprefixer: { disable: true }, // 禁用掉cssnano对于浏览器前缀的处理, 不然会把加好了前缀给移除了
          mergeLonghand: false,
          discardComments: {
            removeAll: true // 移除注释
          }
        },
        canPrint: true
      })
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
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
    new webpack.DefinePlugin({
      'process.env': {
        IS_DEV: JSON.stringify(false),
      },
    }),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new MiniCssExtractPlugin({
      filename: '[chunkhash].min.css',
      chunkFilename: '[chunkhash].css',
    })
  ],
})