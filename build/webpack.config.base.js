const helpers = require("./helpers");
const NamedModulesPlugin = require("webpack/lib/NamedModulesPlugin");
const IgnorePlugin = require("webpack/lib/IgnorePlugin");
const ProgressPlugin = require("webpack/lib/ProgressPlugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

const config = {
  entry: {
    main: helpers.root("/src/rendering/main.ts")
  },
  output: {
    path: helpers.root("/dist"),
    filename: "js/[name].[hash].js",
    chunkFilename: "js/[name].[hash].js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".ts", ".js", ".html", ".mjs", ".vue"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@providers": helpers.root("/src/providers/"),
      "@rendering": helpers.root("/src/rendering/"),
      "@rutils": helpers.root("/src/rendering/utils/runtime-utils/"),
      "@test-utils": helpers.root("/src/rendering/utils/test-util/"),
      "@dev-utils": helpers.root("/src/rendering/utils/dev-util/"),
      "@rtypes": helpers.root("/src/rendering/types/"),
      "@components": helpers.root("/src/rendering/common/components/"),
      "@layout": helpers.root("/src/rendering/common/layout/"),
      "@stores": helpers.root("/src/rendering/common/stores/*"),
      "@storeTypes": helpers.root("/src/rendering/common/stores")
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|vue)$/,
        exclude: [/node_modules/],
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          configFile: helpers.root(".eslintrc.js")
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: modulePath => modulePath.endsWith(".ts"),
        exclude: [/node_modules/],
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
          configFile: helpers.root("tsconfig.src.json")
        }
      }
    ]
  },
  plugins: [
    new ProgressPlugin({
      entries: true,
      modules: true,
      modulesCount: 100,
      profile: true
    }),
    new VueLoaderPlugin(),
    new NamedModulesPlugin(),
    new CopyWebpackPlugin([
      {
        from: "src/rendering/assets",
        to: "./assets"
      }
    ]),
    new IgnorePlugin(/^\.\/locale$/, /moment$/),
    new DuplicatePackageCheckerPlugin({
      verbose: true,
      ignoreSameVersionDuplicates: false,
      strict: true
    })
  ]
};

module.exports = config;
