class DependencyBundleAsset extends SupCore.Data.Base.Asset {
  static currentFormatVersion = 0;
  static schema = {
    formatVersion: { type: 'integer'},
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
}

export { DependencyBundleAsset };
