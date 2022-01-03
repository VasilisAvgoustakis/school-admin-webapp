const path = require('path');

module.exports = {
  resolve: {
    modules: [ "./node_modules/" ] , 
    alias: {
      'components': path.resolve(__dirname, 'src/components'),
      
    },
    extensions: ['.jsx', '.js', '.scss', '.json', '.tsx'],
  },
};