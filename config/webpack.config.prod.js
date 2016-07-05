var webpack = require('webpack')
var path = require('path')
var autoprefixer = require('autoprefixer')
var postCssNested = require('postcss-nested')

module.exports = {
  devtool: 'source-map',
  externals: [
    {
      "react": "React",
      "react-dom": "ReactDOM"
    }
  ],
  entry: [
    path.resolve(__dirname, '../client/main.js')
  ],
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    root: [
      path.resolve(__dirname, '../client'),
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
      loaders: ['react-hot', 'babel'],
      include: [
        path.resolve(__dirname, '../client'),
        path.resolve(__dirname, '../classes')
      ],
      exclude: /node_modules/
    },{
      test: /\.css$/,
      loaders: ['style','css','postcss'],
      include: path.resolve(__dirname, '../client'),
      exclude: /node_modules/
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