import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import ied from 'ied';
import webpack from 'webpack';
import Promise from 'bluebird';

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
  return dependenciesArray.reduce(
    (prev, dependency) =>
      prev.then(() =>
        installAsync(nodeModules, ...dependency))
        .then((pkg) => exposeAsync(nodeModules, pkg))
        .catch((error) => {
          if(error.code !== 'LOCKED') {
            throw error;
          }
        }),
    Promise.resolve());
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
