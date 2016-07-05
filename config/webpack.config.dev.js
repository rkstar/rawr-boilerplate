var webpack = require('webpack')
var path = require('path')
var autoprefixer = require('autoprefixer')
var postCssNested = require('postcss-nested')

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, '../client/main.js')
  ],
  resolve: {
    root: [
      path.resolve(__dirname, '../client'),
      path.resolve(__dirname, '../')
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: [
        path.resolve(__dirname, '../client'),
        path.resolve(__dirname, '../classes')
      ]
    },{
      test: /\.css$/,
      loaders: ['style','css','postcss'],
      include: path.resolve(__dirname, '../client')
    },{
      test: /\.json$/,
      loaders: ['json']
      // include: [
      //   path.resolve(__dirname, '../client'),
      //   path.resolve(__dirname, '../classes'),
      //   path.resolve(__dirname, '../config')
      // ]
    }]
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 versions'] }),
    postCssNested
  ]
}