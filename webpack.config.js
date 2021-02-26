const BrotliPlugin = require('brotli-webpack-plugin');
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
            presets: [ '@babel/preset-env', '@babel/preset-react']
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
    new BrotliPlugin({
      asset: '[file].br',
      test: /\.js$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};