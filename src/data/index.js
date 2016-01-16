import DependencyBundleAsset from './assets/DependencyBundleAsset';

const {
  SupCore,
} = global;

SupCore.system.data.registerAssetClass('dependencyBundle', DependencyBundleAsset);
