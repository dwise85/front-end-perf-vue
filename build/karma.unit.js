const webpackConfig = require("./webpack.config.test");

module.exports = function(config) {
  config.set({
    basePath: "..",
    frameworks: ["mocha", "chai", "sinon"],
    files: ["src/test.ts"],
    preprocessors: {
      "src/test.ts": ["webpack"]
    },
    webpack: webpackConfig,
    webpackServer: { noInfo: true },
    reporters: ["mocha"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ["Chrome"],
    mime: {
      "text/x-typescript": ["ts"]
    },
    singleRun: true
  });
};
