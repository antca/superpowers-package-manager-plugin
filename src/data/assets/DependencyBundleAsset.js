import fs from 'fs';
import path from 'path';
import ied from 'ied';
import webpack from 'webpack';
import _ from 'lodash';
import Promise from 'bluebird';
import { createStore } from 'redux';
import mkdirp from 'mkdirp';

import dataReducer from '../reducer';

import { rebuild, rebuildFinished, rebuildFailed, throwError } from '../actions';

Promise.promisifyAll(fs);
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

class DependencyBundleAsset extends SupCore.Data.Base.Asset {
  static currentFormatVersion = 0;
  static schema = {
    formatVersion: { type: 'integer' },
    state: { type: 'object' },
  }

  constructor(id, pub, server) {
    super(id, pub, DependencyBundleAsset.schema, server);
  }

  init(options, callback) {
    this.pub = {
      formatVersion: DependencyBundleAsset.currentFormatVersion,
      state: void 0,
    };
    callback();
  }

  load(assetPath) {
    this.assetPath = assetPath;
    fs.readFile(path.join(assetPath, 'asset.json'), { encoding: 'utf8' }, (err, json) => {
      if (err) {
        throw err;
      }

      this.pub = JSON.parse(json);
      this.store = createStore(dataReducer, this.pub.state);
      this.store.subscribe(() => this.updatePub());
      this.setup();
      this.emit('load');
    });
  }

  copyBundleInBuildFolder(buildPath) {
    const folderPath = `${buildPath}/assets/${this.server.data.entries.getStoragePathFromId(this.id)}`;
    return mkdirpAsync(folderPath).then(() => {
      return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(this.assetPath, 'bundle.js'))
          .pipe(fs.createWriteStream(path.join(folderPath, 'bundle.js')))
          .on('finish', resolve)
          .on('error', reject);
      });
    });
  }

  publish(buildPath, callback) {
    const { dirty, building } = this.store.getState();
    if(building) {
      const assetPath = this.server.data.entries.getPathFromId(this.id);
      const error = new Error(`The bundle ${assetPath} is building. Please retry later...`);
      this.dispatch(throwError(error));
      return callback(error);
    }
    return (dirty ? () => this.rebuild() : Promise.resolve)()
      .then(() => this.copyBundleInBuildFolder(buildPath)).then(() => callback());
  }

  updatePub() {
    this.pub = {
      formatVersion: DependencyBundleAsset.currentFormatVersion,
      state: this.store.getState(),
    };
    this.emit('change');
  }

  dispatch(action) {
    this.server.io.in(`sub:assets:${this.id}`).emit(
      'edit:assets',
      this.id,
      'dispatch',
      this.store.dispatch(action)
    );
  }

  server_dispatch(client, action, actionCallback) {
    // Resend action to all clients
    actionCallback(null, this.store.dispatch(action));
  }

  client_dispatch(action) {
  }

  rebuild() {
    const { dependencies } = this.store.getState();
    this.dispatch(rebuild());
    return install(this.assetPath, dependencies)
      .then(() => bundle(this.id, this.assetPath, dependencies))
      .then(() => this.dispatch(rebuildFinished()))
      .catch((error) => this.dispatch(rebuildFailed(error)));
  }
}

export default DependencyBundleAsset;
