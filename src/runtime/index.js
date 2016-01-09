import path from 'path';

const {
  SupRuntime,
} = global;

SupRuntime.registerPlugin('dependencyBundle', {
  loadAsset(player, asset, callback) {
    window.__dependencyBundles = window.__dependencyBundles || {};
    const bundleScript = document.createElement('SCRIPT');
    bundleScript.addEventListener('load', () => {
      callback(null, window.__dependencyBundles[asset.id]);
    });
    bundleScript.src = path.join(player.dataURL, 'assets', asset.storagePath, 'bundle.js');
    document.body.appendChild(bundleScript);
  },
});
