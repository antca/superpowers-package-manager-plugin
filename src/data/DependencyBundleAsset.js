import { invokePong } from '../bundleEditor/asset/actions';

class DependencyBundleAsset extends SupCore.Data.Base.Asset {
  static currentFormatVersion = 0;
  static schema = {
    formatVersion: { type: 'integer' },
    dependencies: { type: 'array' },
  }

  constructor(id, pub, server) {
    super(id, pub, server);
  }

  init(options, callback) {
    this.pub = {
      formatVersion: DependencyBundleAsset.currentFormatVersion,
      dependencies: [],
    };
    super.init(options, callback);
  }

  server_ping(client, value, callback) {
    console.log(client);
    callback(null, invokePong(value));
  }

  client_ping() {

  }
}

export default DependencyBundleAsset;
