var path = require('path');
var webpack = require("webpack");

module.exports = {
  options: {
    resolve: {
      root: [
        // when requiring a non-relative path resolve to optly directory firstthen node_modules
        path.resolve(__dirname, '../node_modules'),
      ],
    },

    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      ]
    },

    output: {
      path: './dist/',
      filename: "[name].js",
    },
    stats: {
      chunks: false,
    }
  },

  dev: {
    entry: {
      'app/app': './src/app/main.js',
    },

    plugins: [
      new webpack.DefinePlugin({
        __DEV__: true,
      }),
    ],

    watch: true,

  }
};
