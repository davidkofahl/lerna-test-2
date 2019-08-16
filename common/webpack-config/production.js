const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const base = require('./base');
const { APP_DIR, BUILD_DIR } = require('./paths');

module.exports = (env, namespace = null) => {
  
  if (!namespace) {
    throw new Error('Please provide a target directory');
  }

  return merge(base, {

    mode: 'production',

    output: {
      filename: 'main.[hash].js',
      path: path.resolve(BUILD_DIR, namespace),
      // publicPath: getPublicPath('app', env.target) + 'public',
      publicPath: 'public',
    },

    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: false,
                importLoader: 1,
                localIdentName: '[hash:base64:5]',
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  require('autoprefixer')({
                    browsers: ['last 2 versions', '> 2%'],
                  })
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                // includePaths: [path.resolve(APP_DIR, 'styles')],
              }
            }
          ]
        }
      ]
    },

    plugins: [
      // new CleanWebpackPlugin(['dist'], { root: process.cwd() }),

      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'style.[hash].css',
      }),

      new HtmlWebPackPlugin({
        template: path.resolve(APP_DIR, 'index.ejs'),
        filename: './index.html',
      })
    ],

    stats: 'minimal'
  });
};

