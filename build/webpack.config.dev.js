const helpers = require("./helpers");
const webpackConfig = require("./webpack.config.base");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const IgnorePlugin = require("webpack/lib/IgnorePlugin");
const env = require("../environment/dev.env");

webpackConfig.module.rules = [
  ...webpackConfig.module.rules,
  {
    test: /\.s?[ac]ss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          // only enable hot in development
          hmr: true,
          // if hmr does not work, this is a forceful method.
          reloadAll: true
        }
      },
      { loader: "css-loader", options: { url: false, sourceMap: true } },
      { loader: "sass-loader", options: { sourceMap: true } }
    ]
  },
  {
    test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
    loader: "file-loader"
  }
];

webpackConfig.plugins = [
  ...webpackConfig.plugins,
  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css",
    options: {
      hmr: true,
      reloadAll: true
    }
  }),
  new HtmlWebpackPlugin({
    inject: true,
    template: helpers.root("/src/rendering/index.html"),
    favicon: helpers.root("/src/rendering/assets/favicon.ico")
  }),
  new IgnorePlugin({
    resourceRegExp: /mock$/
  }),
  new DefinePlugin({
    "process.env": env
  })
];

webpackConfig.devServer = {
  port: 8080,
  host: "localhost",
  historyApiFallback: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  hot: true,
  contentBase: "./src/rendering",
  open: false,
  stats: {
    colors: true,
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: true,
    errorDetails: true,
    warnings: true,
    publicPath: false
  }
};

webpackConfig.devtool = "source-map";
webpackConfig.mode = "development";

module.exports = webpackConfig;
