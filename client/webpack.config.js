const path = require('path');

module.exports = {
  resolve: {
    modules: [ "./node_modules/" ] , 
    alias: {
      'components': path.resolve(__dirname, 'src/components'),
      //'styles': path.resolve(__dirname, 'src/styles')
    },
    extensions: ['.jsx', '.js', '.scss', '.json'],
    // fallback: {
    //   process: require.resolve("process/browser"),
    //   zlib: require.resolve("browserify-zlib"),
    //   stream: require.resolve("stream-browserify"),
    //   util: require.resolve("util"),
    //   buffer: require.resolve("buffer"),
    //   asset: require.resolve("assert"),
    // }
  },
  // plugins: [
  //   new webpack.ProvidePlugin({
  //     Buffer: ["buffer", "Buffer"],
  //     process: "process/browser",
  //   }),
  // ]
};