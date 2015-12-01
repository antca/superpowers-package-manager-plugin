import { receiveAsset } from './asset/actions';
const currentStore = require('./store');

console.log(currentStore);

const {
  SupClient,
} = window;

class AssetManager {
  constructor(store, project, assetId) {
    this.assetId = assetId;
    this.store = store;
    this.project = project;
    this.connect();
  }

  connect() {
    this.socket = SupClient.connect(this.project);
    this.socket.on('connect', (...args) => this.onConnect(...args));
    this.socket.on('disconnect', (...args) => this.onDisonnect(...args));
  }

  onConnect() {
    this.projectClient = new SupClient.ProjectClient(this.socket);
    this.projectClient.subAsset(this.assetId, 'dependencyBundle', {
      onAssetReceived: (...args) => this.onAssetReceived(...args),
      onAssetEdited: (...args) => this.onAssetEdited(...args),
      onAssetTrashed: (...args) => this.onAssetTrashed(...args),
    });
  }

  onDisconnect(...args) {
    SupClient.onDisconnected(...args);
  }

  onAssetReceived(assetId, asset) {
    this.store.dispatch(receiveAsset(assetId, asset));
  }

  onAssetEdited(assetId, methodName, action) {
    this.store.dispatch(Object.assign(action), {
      meta: {
        ...(action.meta || {}),
        assetId,
        methodName,
      },
    });
  }

  onAssetTrashed(...args) {
    SupClient.onAssetTrashed(...args);
  }

  invoke(methodName, ...args) {
    return new Promise((resolve, reject) => {
      this.socket.emit('edit:assets', this.assetId, methodName, ...args, (err, res) => {
        if(err) {
          reject(err);
        }
        else {
          resolve(res);
        }
      });
    });
  }
}

const { project, assetId } = SupClient.query;

export default new AssetManager(currentStore, project, assetId);
