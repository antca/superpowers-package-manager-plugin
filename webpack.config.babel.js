import path from 'path';

import _ from 'lodash';
import update from 'react-addons-update';
import webpack from 'webpack';

const baseConfig = {
  entry: {
    api: path.join(__dirname, 'api'),
    componentEditors: path.join(__dirname, 'componentEditors'),
    components: path.join(__dirname, 'components'),
    data: path.join(__dirname, 'data'),
    runtime: path.join(__dirname, 'runtime'),
    settingsEditors: path.join(__dirname, 'settingsEditors'),
    bundleEditor: path.join(__dirname, 'bundleEditor'),
  },
  output: {
    path: path.join(__dirname, 'public', 'bundles'),
    filename: '[name].js',
  },
  resolve: {
    alias: {
      npm: 'empty/object',
      webpack: 'empty/object',
      decache: 'empty/object',
    },
  },
  node: {
    fs: 'empty',
  },
  module: {
    preLoaders: [],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000&name=../assets/webpack/[hash].[ext]',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    }),
  ],
};

const transforms = {
  developement(base) {
    return update(base, {
      debug: { $set: true },
      devtool: { $set: 'eval-source-map' },
      module: {
        preLoaders: {
          $push: [{
            test: /\.js$/,
            loader: 'source-map',
          }],
        },
      },
    });
  },
  production(base) {
    return update(base, {
      plugins: {
        $push: [
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            comments: false,
            compress: {
              warnings: false,
            },
          }),
        ],
      },
    });
  },
};

const envConfig = (transforms[process.env.NODE_ENV] || _.identity)(_.cloneDeep(baseConfig));

export default Object.assign(envConfig, {
  configs: _.mapValues(transforms, (transform) => transform(_.cloneDeep(baseConfig))),
});
