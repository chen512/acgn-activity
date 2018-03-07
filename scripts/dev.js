//import mock from '../mock';
const config = require('../src/config');
const Mock = require('mockjs');
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');
const babel = require('babel-core');
const template = require('babel-template');
const t = require('babel-types');
const express = require('express');
const chalk = require('chalk');
const builder = require('./builder');
const CopyWebpackPlugin = require('copy-webpack-plugin');
require('babel-register');
require('shelljs/global');
global.nodeRequire = require.bind(global);
const mock = require('../src/mock').default;
//const ActivityComponentCleanPlugin require('../plugins/activity-component-clean-plugin').default;
const VueHackPlugin = require('../plugins/vue-hack-plugin').default;
let compiler = null;
const presets = ["babel-preset-es2015", "babel-preset-stage-0"].map(require.resolve);
const plugins = ['babel-plugin-transform-runtime'].map(require.resolve);

if(!test('-d', path.join('src/components')) || !test('-d', path.join('src/mock'))) {
  console.error(chalk.red('require game-open project, please use: npm run init gameopen=xxxx'));
  return;
}

function _init(callback) {
  compiler = webpack({
    context: config.ACTIVITY_BASE_DIR,
    entry: Object.assign({ vendor: ["vue", "vuex", "axios"] }, builder.buildEntrys(process.argv[2])),
    output: {
        path: config.ACTIVITY_BUILD_DIR,
        filename: "[name].bundle.js"
    },
    module: {
      rules: [
        {
            test: /vue/,
            use: [{
                loader: 'babel-loader',
                options: {
                    compact: false,
                    presets: presets,
                    plugins: [
                        [VueHackPlugin]
                    ]
                }
            }]          
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            postcss: [
                require('autoprefixer')({
                    browsers: ["Android >= 2.3", "iOS >= 4"]
                })
            ],
            loaders: {
                js: `${require.resolve("babel-loader")}?presets[]=${presets[0]}&presets[]=${presets[1]}&plugins[]=${plugins[0]}`
            }
          }
        }, 
        {
          test: /\.js$/,
          use: [{
            loader: 'babel-loader',
            options: {
              plugins: plugins,
              presets: presets
            }
          }],
          exclude: /node_modules/
        },
        {
          test: /\.less$/,
          use: ['style-loader', 'css-loader',{
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')({
                    browsers: ["Android >= 2.3", "iOS >= 4"]
                })
              ]
            }
          }, 'less-loader']
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|jpg|gif|svg|jpeg|mp3)$/,
          use: [{
            loader:'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          }]
        }
      ]
    },
    resolveLoader: {
        modules: [config.NODE_MODULES]
    },
    resolve: {
      modules: [config.NODE_MODULES, config.COMPONENTS_DIR],
      alias: {
        components: config.COMPONENTS_DIR,
        assets: path.join(config.ACTIVITY_BASE_DIR, 'assets'),
        images: path.join(config.ACTIVITY_BASE_DIR, 'assets/images')
      },
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env': {NODE_ENV: '"development"', 'IS_SSR': 'false'}
        }),
        new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "vendor.js"}),
        new webpack.HotModuleReplacementPlugin()
    ].concat(!fs.existsSync(path.join(config.ACTIVITY_BASE_DIR, 'entrys', process.argv[2], 'external')) ? [] : [new CopyWebpackPlugin([{ context: path.join(config.ACTIVITY_BASE_DIR, 'entrys', process.argv[2]), from: 'external', to: 'html/external' }], {debug: 'warning', copyUnmodified: true})
    ]).concat(builder.buildHtmlPlugins(process.argv[2])),
    target: "web"
  });

  let server = new WebpackDevServer(compiler, {
      publicPath: "/",
      contentBase: config.ACTIVITY_BASE_DIR,
      hot: true,
      historyApiFallback: false,
      compress: false,
      setup: function(app) {
          app.use('/external', express.static(path.join(config.ACTIVITY_BASE_DIR, 'entrys', process.argv[2], 'external')));
          app.use('/static', express.static('dist'));
          app.use('/games/mock/*', mock);
      },
      clientLogLevel: "info",
      quiet: true,
      noInfo: false,
      lazy: false,
      disableHostCheck: true,
      overlay: {
          warnings: false,
          errors: true
      },
      watchOptions: {
          aggregateTimeout: 200,
          ignored: /node_modules/
      },
      stats: { colors: false }
  });
  server.listen(config.INTERNAL_SERVER_PORT, "0.0.0.0", function() {
    callback();
  });
}

_init(() => {
  console.info(chalk.green(`dev server start at ${config.INTERNAL_SERVER_HOST}`));
});