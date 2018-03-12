
//构建ssr、build目录
const config = require('../src/config');
const builder = require('./builder');
const jsZip = require('./jszip');
const webpack = require('webpack');
const path = require('path');
const chalk = require('chalk');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const renderer = require('vue-server-renderer').createRenderer();
const vm = require('vm');
const fs = require('fs');
let injectHTMLData = {content: ''};

require('shelljs/global');
require('babel-register');
global.nodeRequire = require.bind(global);
const ActivityComponentCleanPlugin = require('../plugins/activity-component-clean-plugin').default;
const VueHackPlugin = require('../plugins/vue-hack-plugin').default;

if(!test('-d', path.join('src/components')) || !test('-d', path.join('src/mock'))) {
    console.error(chalk.red('require game-open project, please use: npm run init gameopen=xxxx'));
    return;
}

const ssrCompiler = webpack({
    context: config.ACTIVITY_BASE_DIR,
    entry: builder.buildEntrys(process.argv[2], 'ssr'),
    output: {
        path: config.ACTIVITY_BUILD_DIR,
        filename: "ssr.bundle.js",
        libraryTarget: "commonjs-module",
        publicPath: '../'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    preserveWhitespace: false,
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: ['ignore-loader', 'less-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ['ignore-loader']
            },
            {
                test: /\.(png|jpg|gif|svg|jpeg)$/,
                loader: 'url-loader',
                options: {
                    limit: 2048,
                    name: 'images/[name].[hash:8].[ext]'
                },
                exclude: /node_modules/
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
            assets: path.join(config.ACTIVITY_BASE_DIR, 'assets')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: '"production"', IS_SSR: 'true'}
        })
    ],
    externals: [nodeExternals({
        modulesDir: config.NODE_MODULES,
        whitelist: /\.css$/
    })],
    target: "node"
});
const presets = ["babel-preset-es2015", "babel-preset-stage-0"].map(require.resolve);
const plugins = ['babel-plugin-transform-runtime'].map(require.resolve);
const standardCompiler = webpack({
    context: config.ACTIVITY_BASE_DIR,
    entry: Object.assign({ vendor: ["vue", "vuex", "axios"] }, builder.buildEntrys(process.argv[2], 'production')),
    output: {
        path: config.ACTIVITY_BUILD_DIR,
        filename: "js/[name].[hash:8].js",
        publicPath: '../'
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
                    preserveWhitespace: false,
                    postcss: [
                        require('autoprefixer')({
                            browsers: ["Android >= 2.3", "iOS >= 4"]
                        })
                    ],
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        }),
                        less: ExtractTextPlugin.extract({
                            use: ['css-loader', 'less-loader'],
                            fallback: 'vue-style-loader'
                        }),
                        js: `${require.resolve("babel-loader")}?presets[]=${presets[0]}&presets[]=${presets[1]}&plugins[]=${plugins[0]}`
                    }
                }
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: presets,
                        compact: false,
                        plugins: plugins,
                        cacheDirectory: path.join(config.ACTIVITY_BASE_DIR, 'cache')
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                //{fallbackLoader:'style-loader',loader:["css-loader"]}
                use: ExtractTextPlugin.extract({fallback: 'style-loader', use:['css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            require('autoprefixer')({
                                browsers: ["Android >= 2.3", "iOS >= 4"]
                            })
                        ]
                    }
                }, 'less-loader']})
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({fallback: 'style-loader', use:['css-loader']})
            },
            // {
            //     test: /\.less$/,
            //     use: ['style-loader', 'css-loader',{
            //         loader: 'postcss-loader',
            //         options: {
            //             plugins: [
            //                 require('autoprefixer')({
            //                     browsers: ["Android >= 2.3", "iOS >= 4"]
            //                 })
            //             ]
            //         }
            //     }, 'less-loader']
            // },
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader']
            // },
            {
                test: /\.(png|jpg|gif|svg|jpeg)$/,
                use: [
                    {
                        loader:'url-loader',
                        options: {
                            limit: 2048,
                            name: 'images/[name].[hash:8].[ext]'
                        }
                    }/*,//Matt 跟电脑系统有关
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            webp: {
                                quality: 75
                            }
                        }
                    }*/
                ]
            },
            {
                test: /\.(mp3)$/,
                use: [
                    {
                        loader:'file-loader',
                        options: {
                            name: 'images/[name].[hash:8].[ext]'
                        }
                    }]
            }
        ]
    },
    resolve: {
        modules: [config.NODE_MODULES, config.COMPONENTS_DIR],
        alias: {
            components: config.COMPONENTS_DIR,
            assets: path.join(config.ACTIVITY_BASE_DIR, 'assets'),
            images: path.join(config.ACTIVITY_BASE_DIR, 'assets/images')
        }
    },
    resolveLoader: {
        modules: [config.NODE_MODULES]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: '"production"', IS_SSR: 'false'}
        }),
        new ExtractTextPlugin("css/[name].[chunkhash:8].css"),
        new webpack.optimize.CommonsChunkPlugin({names: ['vendor']})
    ].concat(!fs.existsSync(path.join(config.ACTIVITY_BASE_DIR, 'entrys', process.argv[2], 'external')) ? [] : [new CopyWebpackPlugin([{ context: path.join(config.ACTIVITY_BASE_DIR, 'entrys', process.argv[2]), from: 'external', to: 'html/external' }], {debug: 'warning'})
    ]).concat(process.env.NODE_ENV == 'debug' ? [] : [
        new webpack.LoaderOptionsPlugin({minimize: true}),
        new ActivityComponentCleanPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]).concat(builder.buildHtmlPlugins(process.argv[2], injectHTMLData)),
    cache: false,
    target: "web"
});

function render(callback) {
    rm('-rf', config.ACTIVITY_BUILD_DIR);
    ssrCompiler.run(function(err, stats) {
        if(err) throw err;
        let code = stats.compilation.assets['ssr.bundle.js'].source();
        //https://stackoverflow.com/questions/20899863/the-module-property-is-undefined-when-using-vm-runinthiscontext
        let m = require('module');
        rm('-f', path.join(config.ACTIVITY_BUILD_DIR, 'ssr.bundle.js'));
        let _exports = {};
        vm.runInThisContext(m.wrap(code))(_exports, require, module);
        let app = _exports.createApp();
        renderer.renderToString(app, (err, html) => {
            if (err) throw err;
            injectHTMLData.content = html;
            standardCompiler.run(function(err, stats) {
                if(err) throw err;
                process.stdout.write(stats.toString({
                    colors: true,
                    modules: false,
                    children: false,
                    chunks: false,
                    chunkModules: false
                }) + '\n');
                callback && callback();
            });
        });
    });
}

render(function() {
    console.info(chalk.green('build done!!'));
    jsZip.buildZip();
});
