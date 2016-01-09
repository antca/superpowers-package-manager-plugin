import path from 'path';

import _ from 'lodash';
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
    path: path.join(__dirname, 'public'),
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
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map',
      },
    ],
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
        loader: 'url-loader?limit=100000',
      },
    ],
  },
};

const transforms = {
  developement(base) {
    return Object.assign(base, {
      debug: true,
      devtool: 'eval-source-map',
    });
  },
  production(base) {
    const plugins = (base.plugins || []).concat([
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        comments: false,
        compress: {
          warnings: false,
        },
      }),
    ]);
    const resolve = _.merge(base.resolve, {
      alias: {
        'redux-logger': 'empty/object',
      },
    });
    return Object.assign(base, {
      plugins,
      resolve,
    });
  },
};

const envConfig = (transforms[process.env.NODE_ENV] || _.identity)(_.cloneDeep(baseConfig));

export default Object.assign(envConfig, {
  configs: _.mapValues(transforms, (transform) => transform(_.cloneDeep(baseConfig))),
});
