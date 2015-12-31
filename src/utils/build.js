import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import Promise from 'bluebird';
import decache from 'decache';

import { ignoreScripts } from '../config';

function createEntryModule(assetId, dependencies) {
  return `global.__npm[${assetId}]={${_.map(dependencies, ({ bindings }, moduleName) =>
    `${bindings.map(({ propertyName, modulePath }) =>
      `'${propertyName}':require('${moduleName}${modulePath === '' ? '' : `/${modulePath}`}'),`).join('')}`
  ).join('')}}`;
}

function install(assetPath, dependencies) {
  // Hack necessary to avoid wierd bugs
  decache('npm');
  const npm = require('npm'); // eslint-disable-line global-require
  return new Promise((resolve, reject) => {
    const dependenciesArray = _.map(dependencies, ({ version }, name) => `${name}@${version}`);
    npm.load({ loglevel: 'silent', 'ignore-scripts': ignoreScripts }, (loadError) => {
      if(loadError) {
        return reject(loadError);
      }
      const installer = new npm.commands.install.Installer(assetPath, false, dependenciesArray);
      installer.run((installError) => {
        if(installError) {
          return reject(installError);
        }
        resolve();
      });
    });
  });
}

function bundle(assetId, assetPath, dependencies) {
  const writeFileAsync = Promise.promisify(fs.writeFile);
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
  return writeFileAsync(path.join(config.entry), createEntryModule(assetId, dependencies))
    .then(() => new Promise((resolve, reject) =>
      webpack(config, (error, stats) => {
        if(error) {
          return reject(error);
        }
        return resolve(stats);
      })
    ));
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
