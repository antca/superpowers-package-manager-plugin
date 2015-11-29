const {
  SupClient,
} = window;

class AssetManager {
  constructor({ project, asset: assetId }) {
    this.project = project;
    this.assetId = assetId;
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
    this.asset = asset;
  }

  onAssetEdited(assetId, methodName, action) {

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

export default AssetManager;
