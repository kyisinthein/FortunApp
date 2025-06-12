const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enhance the resolver to provide shims for Node.js core modules
config.resolver = {
  ...config.resolver,
  extraNodeModules: new Proxy(
    { 
      http: require.resolve('stream-http'), 
      https: require.resolve('https-browserify'), 
      net: require.resolve('react-native-tcp-socket'), 
      tls: require.resolve('react-native-tcp-socket'), 
      crypto: require.resolve('react-native-crypto'),
      stream: require.resolve('readable-stream'),
      url: require.resolve('react-native-url-polyfill'),
      zlib: require.resolve('pako'), // Add this line
      // vm: require.resolve('vm-browserify'),
      // fs: require.resolve('react-native-fs'), // If fs is needed
      // path: require.resolve('path-browserify'), // If path is needed
    },
    {
      get: (target, name) => {
        // Fallback to prevent errors if a module isn't defined above
        if (target.hasOwnProperty(name)) {
          return target[name];
        }
        // Attempt to resolve other modules from node_modules normally
        try {
          return require.resolve(name);
        } catch (e) {
          // If it cannot be resolved, return a path to an empty module or handle appropriately
          // This prevents crashing if a module is truly unavailable and not shimmed.
          // console.warn(`Module ${name} not found, using empty shim.`);
          return require.resolve('./empty-module-shim'); // Create an empty 'empty-module-shim.js' file
        }
      },
    }
  ),
};

module.exports = config;