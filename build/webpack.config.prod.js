process.env.NODE_ENV = "production";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const autoprefixer = require("autoprefixer");
const webpackConfig = require("./webpack.config.base");
const helpers = require("./helpers");
const DefinePlugin = require("webpack/lib/DefinePlugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const IgnorePlugin = require("webpack/lib/IgnorePlugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const env = require("../environment/prod.env");

webpackConfig.module.rules = [
  ...webpackConfig.module.rules,
  // We run through at build time for prod builds and strip out code with the following tags for optimizing the bundle
  {
    test: /\.(js|ts|vue)$/,
    exclude: [/(node_modules|\.spec\.js)/],
    loader: "webpack-strip-blocks",
    options: {
      blocks: ["WEBPACK_STRIP"],
      start: "/**",
      end: "*/"
    }
  },
  {
    test: /\.(sa|sc|c)ss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: false
        }
      },
      {
        loader: "css-loader",
        options: {
          sourceMap: false,
          importLoaders: 2
        }
      },
      {
        loader: "postcss-loader",
        options: {
          plugins: () => [autoprefixer],
          sourceMap: false
        }
      },
      {
        loader: "sass-loader",
        options: {
          sourceMap: false
        }
      }
    ]
  },
  {
    test: /\.(jpg|png|gif)$/,
    loader: "file-loader",
    options: {
      regExp: /(img\/.*)/,
      name: "[name].[ext]",
      publicPath: "../",
      outputPath: "assets/img/"
    }
  },
  {
    test: /\.(eot|svg|ttf|woff|woff2)$/,
    loader: "file-loader",
    options: {
      regExp: /(fonts\/.*)/,
      name: "[name].[ext]",
      publicPath: "../",
      outputPath: "fonts/"
    }
  }
];

// ensure ts lint fails the build
webpackConfig.module.rules[0].options = {
  failOnHint: true
};

webpackConfig.performance = {
  hints: "warning",
  maxEntrypointSize: 400000,
  maxAssetSize: 250000
};

webpackConfig.optimization = {
  namedModules: false,
  splitChunks: {
    chunks: "all",
    cacheGroups: {
      styles: {
        name: "styles",
        test: /\.css$/,
        chunks: "all",
        enforce: true
      }
    }
  },
  runtimeChunk: "single",
  concatenateModules: true,
  minimize: true,
  usedExports: true,
  removeAvailableModules: true,
  removeEmptyChunks: true,
  mergeDuplicateChunks: true,
  minimizer: [
    new TerserJSPlugin({
      sourceMap: false,
      parallel: true,
      cache: "./dist/.build_cache/terser",
      terserOptions: {
        ecma: 7,
        warnings: false,
        ie8: false,
        output: {
          comments: false
        }
      }
    }),
    new OptimizeCssAssetsPlugin()
  ]
};

webpackConfig.stats = {
  colors: true,
  hash: true,
  version: false,
  timings: true,
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
};

webpackConfig.plugins = [
  ...webpackConfig.plugins,
  new MiniCssExtractPlugin({
    filename: "css/[name].[contenthash].css",
    chunkFilename: "css/[id].[contenthash].css"
  }),
  new OptimizeCssAssetsPlugin({
    cssProcessor: require("cssnano"),
    cssProcessorPluginOptions: {
      preset: [
        "default",
        { discardUnused: true, discardComments: { removeAll: true } }
      ]
    },
    canPrint: true
  }),
  new HtmlWebpackPlugin({
    inject: true,
    title: "Vue Performance Test App",
    template: helpers.root("/src/rendering/index.html"),
    favicon: helpers.root("/src/rendering/assets/favicon.ico"),
    chunksSortMode: "dependency",
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }
  }),
  new CompressionPlugin({
    filename: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.js$/,
    threshold: 10240,
    minRatio: 0.8
  }),
  new DefinePlugin({
    "process.env": env
  }),
  new FaviconsWebpackPlugin({
    logo: helpers.root("/src/rendering/assets/img/icon.png"),
    inject: true,
    favicons: {
      appName: "vue-performance-app",
      appShortName: "perf-app",
      appDescription: "Vue Performance Test App",
      background: "#fff",
      // eslint-disable-next-line @typescript-eslint/camelcase
      start_url: "/?entry=pwa",
      // eslint-disable-next-line @typescript-eslint/camelcase
      theme_color: "#fff",
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        favicons: true,
        firefox: false,
        windows: true,
        coast: false,
        yandex: false
      }
    }
  }),
  // Make sure we remove all bundles that are created for mocks
  new IgnorePlugin(/mock$/),
  new IgnorePlugin(/vue-hot-reload-api$/),
  new BundleAnalyzerPlugin({
    analyzerMode: "static",
    openAnalyzer: false,
    defaultSizes: "gzip",
    generateStatsFile: true
  }),
  // service worker caching
  new WorkboxPlugin.GenerateSW({
    swDest: "service-worker.js",
    clientsClaim: true,
    skipWaiting: true,
    importWorkboxFrom: "cdn",
    cleanupOutdatedCaches: true,
    runtimeCaching: [
      {
        urlPattern: new RegExp("https://jsonplaceholder.typicode.com"),
        handler: "CacheFirst"
      }
    ]
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
  hot: false,
  compress: true,
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

webpackConfig.mode = "production";

module.exports = webpackConfig;
