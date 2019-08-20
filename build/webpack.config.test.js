const helpers = require("./helpers");
const webpackConfig = require("./webpack.config.base");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SourceMapDevToolPlugin = require("webpack/lib/SourceMapDevToolPlugin");
const env = require("../environment/dev.env");

webpackConfig.module.rules = [
  {
    test: /\.vue$/,
    loader: "vue-loader"
  },
  {
    test: modulePath =>
      modulePath.endsWith(".ts") && !modulePath.endsWith("spec.ts"),
    exclude: [/node_modules/, /spec.ts/, /mock/],
    loader: "ts-loader",
    options: {
      appendTsSuffixTo: [/\.vue$/],
      configFile: helpers.root("tsconfig.json")
    }
  },
  {
    test: modulePath =>
      modulePath.endsWith("spec.ts") || modulePath.endsWith("mock.ts"),
    include: [/spec.ts/, /mock/],
    exclude: [/node_modules/],
    loader: "ts-loader",
    options: {
      configFile: helpers.root("tsconfig.test.json")
    }
  },
  {
    test: /\.(sa|sc|c)ss$/,
    use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
  },
  {
    test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
    loader: "url-loader?limit=8192"
  }
];

webpackConfig.plugins = [
  ...webpackConfig.plugins,
  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css"
  }),
  new SourceMapDevToolPlugin({
    filename: null, // if no value is provided the sourcemap is inlined
    test: /\.(ts|js)($|\?)/i
  }),
  new DefinePlugin({
    "process.env": env
  })
];

webpackConfig.devtool = "inline-source-map";
webpackConfig.mode = "development";

module.exports = webpackConfig;
