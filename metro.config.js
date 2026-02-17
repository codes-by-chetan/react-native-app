const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

if (defaultConfig.watcher) {
  delete defaultConfig.watcher.unstable_lazySha1;
  delete defaultConfig.watcher.unstable_autoSaveCache;
}

const config = {};

module.exports = mergeConfig(defaultConfig, config);

// /* build-ref:delta */
