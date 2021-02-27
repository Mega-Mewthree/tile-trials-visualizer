const path = require("path");

const config = require("./config.js");

module.exports = {
  outputDir: path.resolve(__dirname, "./dist"),
  devServer: {
    disableHostCheck: true
  },
  publicPath: config.path,
  transpileDependencies: [
    "vuetify"
  ],
  productionSourceMap: false
};
