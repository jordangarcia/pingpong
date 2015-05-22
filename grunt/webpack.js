var path = require('path');
var webpack = require("webpack");

module.exports = {
  options: {
    resolve: {
      root: [
        // when requiring a non-relative path resolve to optly directory firstthen node_modules
        path.resolve(__dirname, '../src'),
        path.resolve(__dirname, '../node_modules'),
      ],
      alias: {
        // hack to get vue to load with babel-loader
        'vue': path.resolve(__dirname, '../node_modules/vue/dist/vue'),
      }
    },

    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
        { test: /\.html/, exclude: /node_modules/, loader: 'html-loader'},
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
      app: './src/main.js',
    },

    plugins: [
      new webpack.DefinePlugin({
        __DEV__: true,
      }),
    ],

    watch: true,

    keepalive: true,
  }
};
