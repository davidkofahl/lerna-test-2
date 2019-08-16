const path = require('path');
const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const CopyWebPackPlugin = require('copy-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              ['@babel/preset-env', { targets: { browsers: ['last 2 versions'] } }]
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              'react-hot-loader/babel'
            ],
            cacheDirectory: '.babel-cache',
            babelrc: false,
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-loader',
      },
      {
        test: /\.(html)$/,
        loader: 'html-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(svg|md|txt)/,
        use: 'raw-loader',
      }
    ]
  },

  resolve: {
    // modules: [path.resolve(APP_DIR), path.resolve('node_modules')],
    extensions: ['.js', '.jsx', '.scss', '.css']
  },

};
