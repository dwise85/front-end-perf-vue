const webpackConfig = require("./webpack.config.test");

module.exports = function(config) {
  config.set({
    basePath: "..",
    frameworks: ["source-map-support", "mocha", "chai", "sinon"],
    files: ["src/test.ts"],
    reporters: ["mocha"],
    preprocessors: {
      "src/test.ts": ["webpack"]
    },
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },
    mime: {
      "text/x-typescript": ["ts"]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    sourceMaps: true,
    browsers: ["Chrome_with_debugging"],
    customLaunchers: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      Chrome_with_debugging: {
        base: "Chrome",
        flags: ["--remote-debugging-port=9222"],
        debug: true
      }
    },
    singleRun: false
  });
};
