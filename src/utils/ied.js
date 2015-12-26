import _ from 'lodash';
import fs from 'fs';
import ied from 'ied';
import mkdirp from 'mkdirp';
import path from 'path';
import webpack from 'webpack';
import Promise from 'bluebird';
import rimraf from 'rimraf';

const rimrafAsync = Promise.promisify(rimraf);

const mkdirpAsync = Promise.promisify(mkdirp);
const writeFileAsync = Promise.promisify(fs.writeFile);

function createEntryModule(assetId, dependencies) {
  return `global.__npm[${assetId}]={${_.map(dependencies, ({ bindings }, moduleName) =>
    `${bindings.map(({ propertyName, modulePath }) =>
      `'${propertyName}':require('${moduleName}${modulePath === '' ? '' : `/${modulePath}`}'),`).join('')}`
  ).join('')}}`;
}

function formatDependencies(dependencies) {
  return _.map(dependencies, ({ version }, name) => [name, version]);
}

function install(assetPath, dependencies) {
  const installAsync = Promise.promisify(ied.install);
  const exposeAsync = Promise.promisify(ied.expose);
  const nodeModules = path.join(assetPath, 'node_modules');
  const dependenciesArray = formatDependencies(dependencies);
  return rimrafAsync(nodeModules)
    .then(() => mkdirpAsync(path.join(nodeModules, '.bin')))
    .then(() => Promise.all(dependenciesArray.map((dependency) => installAsync(nodeModules, ...dependency))))
    .then((pkgs) => Promise.all(pkgs.map((pkg) => exposeAsync(nodeModules, pkg))))
    .catch((error) => {
      throw error;
    });
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
  createEntryModule,
  formatDependencies,
  install,
  bundle,
  build,
};
