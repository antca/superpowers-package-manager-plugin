import _ from 'lodash';
import fs from 'fs';
import ied from 'ied';
import mkdirp from 'mkdirp';
import path from 'path';
import webpack from 'webpack';
import Promise from 'bluebird';

const mkdirpAsync = Promise.promisify(mkdirp);

function template(assetId, dependencies) {
  return `window.__npm[${assetId}]={${_.map(dependencies, ({ bindings }, moduleName) =>
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
  return mkdirpAsync(path.join(nodeModules, '.bin'))
    .then(() => Promise.all(dependenciesArray.map((dependency) => installAsync(nodeModules, ...dependency))))
    .then((pkgs) => Promise.all(pkgs.map((pkg) => exposeAsync(nodeModules, pkg))))
    .catch((error) => {
      if(error.code !== 'LOCKED') {
        throw error;
      }
    });
}

function bundle(assetId, assetPath, dependencies) {
  const config = {
    context: assetPath,
    entry: './entry.js',
    output: {
      path: assetPath,
      filename: 'bundle.js',
    },
  };
  return fs.writeFileAsync(path.join(config.context, config.entry), template(assetId, dependencies))
    .then(() => new Promise((resolve, reject) => webpack(config, (error, stats) => {
      if(error) {
        return reject(error);
      }
      return resolve(stats);
    })));
}

function build(assetId, assetPath, dependencies) {
  return install(assetPath, dependencies)
    .then(() => bundle(assetId, assetPath, dependencies));
}

export { build };
