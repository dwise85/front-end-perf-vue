const webpackConfig = require("./webpack.config.coverage");

module.exports = function(config) {
  config.set({
    basePath: "..",
    frameworks: ["mocha", "chai", "sinon"],
    files: ["src/test.ts"],
    reporters: ["mocha", "coverage-istanbul"],
    preprocessors: {
      "src/test.ts": ["webpack"]
    },
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ["Chrome"],
    mime: {
      "text/x-typescript": ["ts"]
    },
    singleRun: true,
    sourceMaps: true,
    concurrency: Infinity,
    coverageIstanbulReporter: {
      reports: ["html", "lcovonly", "text-summary"],
      combineBrowserReports: true,
      fixWebpackSourcePaths: true,
      verbose: true,
      instrumentation: {
        "default-excludes": false
      },
      thresholds: {
        emitWarning: false,
        global: {
          statements: 80,
          lines: 80,
          branches: 80,
          functions: 80
        },
        each: {
          statements: 80,
          lines: 80,
          branches: 80,
          functions: 80
        }
      }
    }
  });
};
