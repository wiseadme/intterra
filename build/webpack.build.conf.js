const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')

const buildConfig = merge(baseConfig, {
  mode: 'production',
  plugins: [],
  devtool: 'source-map'
})

module.exports = new Promise(res => {
  res(buildConfig)
})
