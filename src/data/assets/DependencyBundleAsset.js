import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import Promise from 'bluebird';
import { createStore } from 'redux';

import dataReducer from '../reducer';
import { build } from '../../utils/build';
import { copyFile } from '../../utils/fs';
import { rebuild, rebuildFinished, rebuildFailed, throwError } from '../actions';

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
      this.store = createStore(dataReducer, Object.assign({}, this.pub.state, {
        building: false,
        dirty: true,
        error: null,
      }));
      this.store.subscribe(() => this.updatePub());
      this.setup();
      this.emit('load');
    });
  }

  publish(buildPath, callback) {
    const { dirty, building, dependencies } = this.store.getState();
    const folderPath = path.join(buildPath, 'assets', this.server.data.entries.getStoragePathFromId(this.id));
    if(building) {
      const assetPath = this.server.data.entries.getPathFromId(this.id);
      const error = new Error(`The bundle ${assetPath} is building. Please retry later...`);
      this.dispatch(throwError(error));
      return callback(error);
    }
    this.dispatch(rebuild());
    return (dirty ? build(this.id, this.assetPath, dependencies) : Promise.resolve())
    .then(() => mkdirpAsync(folderPath))
    .then(() => copyFile(path.join(this.assetPath, BUNDLE_NAME), path.join(folderPath, BUNDLE_NAME)))
    .then(() => {
      this.dispatch(rebuildFinished());
      return callback();
    })
    .catch((error) => {
      this.dispatch(rebuildFailed(error));
      return callback(error);
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
    actionCallback(null, this.store.dispatch(action));
  }

  client_dispatch() { // eslint-disable-line camelcase
  }
}

export default DependencyBundleAsset;
