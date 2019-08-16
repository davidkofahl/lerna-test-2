const path = require('path')
const merge = require('webpack-merge')
const { paths, production } = require('@tny/webpack-config');
const CopyWebPackPlugin = require('copy-webpack-plugin');

const cwd = process.cwd();
const name = require(path.resolve(cwd, 'package.json')).name;

module.exports = (env) => {
  return merge(production(env, name), {
    entry: path.resolve(cwd, 'index.js'),

    plugins: [
      // new webpack.DefinePlugin({
        // ENV: JSON.stringify(env.target),
        // ENDPOINT: JSON.stringify(getPublicPath('assets', env.target)),
        // APP: JSON.stringify(getPublicPath('app', env.target)),
      // }),

      // new CopyWebPackPlugin([{ from: paths.PUBLIC_DIR, to: 'public' }])
    ]
  });
};
