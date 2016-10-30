import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import Promise from 'bluebird';
import { createStore } from 'redux';

import dataReducer from '../reducer';
import { build } from '../../utils/build';
import { copyFile } from '../../utils/fs';
import { rebuild, rebuildFinished, rebuildFailed, resetStatus, updateAssetState } from '../actions';

const {
  SupCore,
} = global;

const mkdirpAsync = Promise.promisify(mkdirp);
Promise.promisifyAll(fs);

const BUNDLE_NAME = 'bundle.js';

class DependencyBundleAsset extends SupCore.Data.Base.Asset {
  static currentFormatVersion = 0;
  static schema = {
    formatVersion: { type: 'integer' },
    state: { type: 'object' },
  };

  constructor(id, pub, server) {
    super(id, pub, DependencyBundleAsset.schema, server);
    this.store = createStore(dataReducer, {
      building: false,
      dirty: true,
      error: null,
      dependencies: {},
    });
    this.store.subscribe(() => this.updatePub());
    this.saveConfig = Promise.promisify((...args) => super.save(...args));
  }

  init(asset, callback) {
    this.updatePub();
    callback();
  }

  load(assetPath) {
    this.assetPath = assetPath;
    fs.readFile(path.join(assetPath, 'asset.json'), { encoding: 'utf8' }, (err, json) => {
      if (err) {
        throw err;
      }
      this.store.dispatch(updateAssetState(JSON.parse(json).state));
      this.store.dispatch(resetStatus());
      this.setup();
      this.emit('load');
    });
  }

  save(folderPath, callback) {
    if(!this.assetPath) {
      this.assetPath = folderPath;
    }
    const { dirty, building, dependencies } = this.pub.state;
    const cacheFolder = path.join(this.assetPath, 'cache');
    return this.saveConfig(folderPath)
    .then(() => {
      if(dirty && !building) {
        return mkdirpAsync(cacheFolder)
        .then(() => this.dispatch(rebuild()))
        .then(() => build(this.id, cacheFolder, dependencies))
        .then(() => this.dispatch(rebuildFinished()));
      }
    })
    .then(() => copyFile(path.join(cacheFolder, BUNDLE_NAME), path.join(folderPath, BUNDLE_NAME)))
    .then(() => callback())
    .catch((error) => {
      callback(error);
      return this.dispatch(rebuildFailed(error));
    });
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

  server_dispatch(client, action, actionCallback) { // eslint-disable-line camelcase
    // Resend action to all clients
    actionCallback(null, true, this.store.dispatch(action));
  }

  client_dispatch() {} // eslint-disable-line camelcase
}

export default DependencyBundleAsset;
