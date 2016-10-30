import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import Promise from 'bluebird';
import BaseReporter from 'yarn/lib/reporters/base-reporter';
import Config from 'yarn/lib/config';
import { run as yarnAdd } from 'yarn/lib/cli/commands/add';
import { run as yarnInstall } from 'yarn/lib/cli/commands/install';

import { ignoreScripts } from '../config';

const writeFileAsync = Promise.promisify(fs.writeFile);
const webpackAsync = Promise.promisify(webpack);

function createEntryModule(assetId, dependencies) {
  return `global.__dependencyBundles[${assetId}]={${_.map(dependencies, ({ bindings }, moduleName) =>
    `${bindings.map(({ propertyName, modulePath }) =>
      `'${propertyName}':require('${moduleName}${modulePath === '' ? '' : `/${modulePath}`}'),`).join('')}`
  ).join('')}}`;
}

function install(assetPath, dependencies) {
  if(_.isEmpty(dependencies)) {
    return Promise.resolve();
  }
  const reporter = new BaseReporter();
  const config = new Config(reporter);
  return config.init({
    cwd: assetPath,
    preferOffline: true,
    ignoreScripts,
  })
  .then(() => yarnAdd(config, reporter, {}, _.map(dependencies, ({ version }, name) => `${name}@${version}`)))
  .then(() => yarnInstall(config, reporter, {}, []));
}

function bundle(assetId, assetPath, dependencies) {
  const config = {
    entry: path.join(assetPath, 'entry.js'),
    output: {
      path: assetPath,
      filename: 'bundle.js',
    },
    node: {
      fs: 'empty',
    },
    module: {
      loaders: [
        {
          test: /\.json$/,
          loader: 'json',
        },
      ],
    },
  };
  return writeFileAsync(config.entry, createEntryModule(assetId, dependencies))
  .then(() => webpackAsync(config));
}

function build(assetId, assetPath, dependencies) {
  return install(assetPath, dependencies)
    .then(() => bundle(assetId, assetPath, dependencies));
}

export {
  build,
  createEntryModule,
  install,
};
