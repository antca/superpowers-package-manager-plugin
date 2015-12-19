import fs from 'fs';
import path from 'path';
import npm from 'npm';
import webpack from 'webpack';
import _ from 'lodash';
import Promise from 'bluebird';
import { createStore } from 'redux';

import dataReducer from '../reducer';

import { rebuildFinished, rebuildFailed, REBUILD } from '../actions';

Promise.promisifyAll(fs);

function template(dependencies) {
  return `Sup.npm={${_.map(dependencies, ({ bindings }, moduleName) =>
    `${bindings.map(({ propertyName, modulePath }) =>
      `'${propertyName}':require('${moduleName}${modulePath === '' ? '' : `/${modulePath}`}'),`).join('')}`
  ).join('')}}`;
}

function formatDependencies(dependencies) {
  return _.map(dependencies, ({ version }, name) => `${name}@${version}`);
}

function install(assetPath, dependencies) {
  return new Promise((resolve, reject) => {
    const dependenciesArray = formatDependencies(dependencies);
    npm.load({}, (loadError) => {
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

function bundle(assetPath, dependencies) {
  const config = {
    context: assetPath,
    entry: './entry.js',
    output: {
      path: assetPath,
      filename: 'bundle.js',
    },
  };
  return fs.writeFileAsync(path.join(config.context, config.entry), template(dependencies))
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

  updatePub() {
    this.pub = {
      formatVersion: DependencyBundleAsset.currentFormatVersion,
      state: this.store.getState(),
    };
    this.emit('change');
  }

  server_dispatch(client, action, actionCallback) {
    const taskPromise = this.handleTaskActions(action);
    if(taskPromise) {
      taskPromise.then((resultAction) => {
        this.schema.io.in(`sub:assets:${this.id}`).emit(
          'edit:assets',
          this.id,
          'dispatch',
          this.store.dispatch(resultAction)
        );
      });
    }
    // Resend action to all clients
    actionCallback(null, this.store.dispatch(action));
  }

  client_dispatch(action) {
  }

  handleTaskActions(action) {
    return ({
      [REBUILD]: () => {
        return this.rebuild()
          .then(() => rebuildFinished())
          .catch((error) => rebuildFailed(error));
      },
    }[action.type] || (() => {}))(action.payload, action.meta);
  }

  rebuild() {
    const { dependencies } = this.store.getState();
    return install(this.assetPath, dependencies)
      .then(() => bundle(this.assetPath, dependencies));
  }
}

export default DependencyBundleAsset;
