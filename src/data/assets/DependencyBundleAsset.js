import fs from 'fs';
import path from 'path';
import { createStore } from 'redux';
import dataReducer from '../reducer';

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

  client_load(...args) {
  }

  server_dispatch(client, action, actionCallback) {
    this.store.dispatch(action);
    actionCallback(null, action);
  }

  client_dispatch(action) {
  }

}

export default DependencyBundleAsset;
