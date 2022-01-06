const path = require('path');

module.exports = {
  resolve: {
    modules: [ "./node_modules/" ] , 
    alias: {
      'components': path.resolve(__dirname, 'src/components'),
      //'styles': path.resolve(__dirname, 'src/styles')
    },
    extensions: ['.jsx', '.js', '.scss', '.json'],
  },
};