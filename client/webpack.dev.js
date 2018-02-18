const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    port: 5001,
    contentBase: './dist',
    open: true,
    openPage: '',
  },
});
