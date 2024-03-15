const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const defaultConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve(
      '@dynatrace/react-native-plugin/lib/dynatrace-transformer',
    ),
  },
  reporter: require('@dynatrace/react-native-plugin/lib/dynatrace-reporter'),
};

module.exports = mergeConfig(defaultConfig, config);
// module.exports = mergeConfig(getDefaultConfig(__dirname), config);
