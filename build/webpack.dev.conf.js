const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')

const devConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: baseConfig.externals.path.dist,
    port: 3000,
    proxy: {
      '/api': 'http://localhost:20001'
    },
    overlay: {
      warnings: false,
      errors: true
    },
    historyApiFallback: true,
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    })
  ]
})

module.exports = new Promise((res, rej) => {
  res(devConfig)
})
