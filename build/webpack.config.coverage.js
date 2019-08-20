const webpackConfig = require("./webpack.config.test");

webpackConfig.module.rules = [
  ...webpackConfig.module.rules,
  {
    test: /\.(ts|js)$/,
    enforce: "post",
    loader: "istanbul-instrumenter-loader",
    exclude: [/node_modules/, /\.spec\.ts$/],
    query: {
      esModules: true
    }
  }
];

module.exports = webpackConfig;
