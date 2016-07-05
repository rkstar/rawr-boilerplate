var webpack = require('webpack')
var path = require('path')
var nodeExternals = require('webpack-node-externals')

module.exports = {
  devtool: 'source-map',
  target: 'node',
  externals: [nodeExternals()],
  entry: [
    path.resolve(__dirname, '../server/prod.js')
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'server.js'
  },
  resolve: {
    root: [
      path.resolve(__dirname, '../')
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: [
        path.resolve(__dirname, '../server'),
        path.resolve(__dirname, '../classes')
      ],
      exclude: /node_modules/
    },{
      test: /\.json$/,
      loaders: ['json'],
      exclude: /node_modules/
      // include: [
      //   path.resolve(__dirname, '../client'),
      //   path.resolve(__dirname, '../classes'),
      //   path.resolve(__dirname, '../config')
      // ]
    }]
  }
}