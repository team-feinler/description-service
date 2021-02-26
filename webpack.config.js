const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
  entry: __dirname + '/client/src/index.jsx',
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [{modules: false}, '@babel/preset-env', '@babel/preset-react']
          },
        }
      }
    ]
  },
  output: {
    filename: 'description_bundle.js',
    path: __dirname + '/public'
  },
  plugins: [
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE': JSON.stringify('production')
    })
  ]
};