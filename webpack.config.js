const merge = require("webpack-merge");
const parts = require("./webpack.parts");

const baseConfig = merge([
    parts.HTMLWebpackConfig,
    parts.loadImagesAndFonts,
    parts.loadJavaScript,
]);


const productionConfig = merge([
    parts.loadAndExtractCSS,
]);

const developmentConfig = merge([
    parts.loadCSS,
    parts.sourceMaps,
    parts.dashboard,
    parts.friendlierErrors
]);

module.exports = mode => {
  if(mode === "production"){
    return merge([baseConfig, productionConfig, {mode}]);
  }
  else{
    return merge([baseConfig, developmentConfig, {mode}]);
  }
};
