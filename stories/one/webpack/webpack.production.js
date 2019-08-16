const path = require('path')
const merge = require('webpack-merge')
const { production } = require('@tny/webpack-config');

module.exports = (env) => {
  return merge(production, {
    entry: path.resolve(process.cwd(), 'index.js'),

    plugins: [
      // new webpack.DefinePlugin({
        // ENV: JSON.stringify(env.target),
        // ENDPOINT: JSON.stringify(getPublicPath('assets', env.target)),
        // APP: JSON.stringify(getPublicPath('app', env.target)),
      // }),

      // new CopyWebPackPlugin([{ from: PUBLIC_DIR, to: 'public' }])
    ]
  });
};
