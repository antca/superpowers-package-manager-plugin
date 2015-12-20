import path from 'path';

const {
  SupRuntime,
} = global;

SupRuntime.registerPlugin('dependencyBundle', {
  loadAsset(player, asset, callback) {
    console.log(asset);
    window.__npm = window.__npm || {};
    const bundleScript = document.createElement('SCRIPT');
    bundleScript.addEventListener('load', () => {
      callback(null, window.__npm[asset.id]);
    });
    bundleScript.src = path.join(player.dataURL, 'assets', asset.storagePath, 'bundle.js');
    document.body.appendChild(bundleScript);
  },
});
