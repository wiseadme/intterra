const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
require('dotenv').config()

const resolve = pathString => {
  return path.resolve(__dirname, pathString)
}

const PATH = {
  src: resolve('../src'),
  dist: resolve('../dist'),
  public: 'public/',
  assets: 'assets/',
}

module.exports = {
  externals: {
    path: PATH,
  },
  entry: {
    app: `${ PATH.src }/main.ts`,
  },

  output: {
    filename: `${ PATH.assets }js/[name].[hash].js`,
    path: PATH.dist,
    publicPath: '/',
    chunkFilename: `chunk.[name].[hash].js`
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {},
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loader: {
            scss: 'vue-style-loader!css-loader!sass-loader'
          },
          esModule: false
        }
      },
      {
        test: /.html$/,
        loader: 'vue-template-loader',
        exclude: /index.html/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
          { loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
              resources: [
                resolve('../src/assets/scss/main.scss'),
              ]
            }
          }
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@': PATH.src,
      '/': PATH.public,
      'vue': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.json', '.vue', '.ts']
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `${ PATH.assets }css/[name].[hash].css`,
      chunkFilename: `${ PATH.assets }css/chunk.[name].[hash].css`,
    }),

    new HtmlWebpackPlugin({
      hash: false,
      template: `${ PATH.public }/index.html`,
      filename: 'index.html',
      inject: true
    }),

    new CopyWebpackPlugin([
      { from: `${ PATH.src }/assets`, to: `${ PATH.assets }` },
      { from: `${ PATH.public }`, to: `${ PATH.assets }/img/` }
    ]),

    new VueLoaderPlugin()
  ],
}
