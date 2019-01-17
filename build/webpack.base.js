const htmlPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
var path = require('path');
const cwd = process.cwd();
const babel = require(path.join(cwd, '.babelrc.js'));

module.exports = {
  entry: {
    app: './app.js',
    admin: './admin.js'
  },
  externals: [{
    ui: './packages'
  }],
  output: {
    filename: '[name].build.js',
    path: path.resolve(cwd, 'dist'),
    chunkFilename: '[chunkhash].chunk.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        development: true,
        production: true
      },
      IS_DEV: JSON.stringify(false),
    }),
    new htmlPlugin({
      filename: 'index.html',
      template: path.resolve(cwd, 'index.html'),
      title: "app",
      chunks: ['app']
    }),
    new htmlPlugin({
      filename: 'admin.html',
      template: path.resolve(cwd, 'admin.html'),
      title: "admin",
      chunks: ['admin']
    }),
    new VueLoaderPlugin(),
    autoprefixer
  ],

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue': 'vue/dist/vue.js',
      '@view': './app/view'
    }
  },

  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: babel
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
            outputPath: 'assets/' // 图片打包后存放的目录
          }
        }]
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: 'file-loader'
      }
    ]
  }
}