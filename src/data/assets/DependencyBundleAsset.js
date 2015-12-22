import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import { createStore } from 'redux';

import mkdirp from 'mkdirp';

import { build } from '../../utils/dependencies';
import dataReducer from '../reducer';
import { rebuild, rebuildFinished, rebuildFailed, throwError } from '../actions';

const mkdirpAsync = Promise.promisify(mkdirp);

Promise.promisifyAll(fs);

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

  publish(buildPath, callback) {
    const { dirty, building, dependencies } = this.store.getState();
    const folderPath = `${buildPath}/assets/${this.server.data.entries.getStoragePathFromId(this.id)}`;
    if(building) {
      const assetPath = this.server.data.entries.getPathFromId(this.id);
      const error = new Error(`The bundle ${assetPath} is building. Please retry later...`);
      this.dispatch(throwError(error));
      return callback(error);
    }
    this.dispatch(rebuild());
    return (dirty ? build(this.id, this.assetPath, dependencies) : Promise.resolve())
    .then(() => mkdirpAsync(folderPath).then(() => {
      return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(this.assetPath, 'bundle.js'))
          .pipe(fs.createWriteStream(path.join(folderPath, 'bundle.js')))
          .on('finish', resolve)
          .on('error', reject);
      });
    }))
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
