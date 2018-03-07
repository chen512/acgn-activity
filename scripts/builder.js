const fs = require('fs');
const path = require('path');
const config = require('../src/config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const chalk = require('chalk');

exports.buildEntrys = function(dir, env) {
    let entry = {};
    if(!dir) { //if undefined build all
        dir = fs.readdirSync(path.join(process.cwd(), 'src/entrys'))[0];
    }
    let dirs = [dir];
    dirs.forEach(function(dir) {
        console.info(chalk.green(`building page with env(${chalk.yellow(env || 'dev')}) --> ${chalk.cyan(dir)}`));
       if(env == 'ssr') {
            entry[dir] = [`./entrys/${dir}/entry-ssr`];
        } else if(env == 'production') {
            entry[dir] = [`./entrys/${dir}/entry-client`];
        } else {
            entry[dir] = ["webpack/hot/dev-server", `webpack-dev-server/client?${config.INTERNAL_SERVER_HOST}`, `./entrys/${dir}/entry-client`];
        }
    });
    return entry;
}

exports.buildHtmlPlugins = function(dir, injectHTMLData) {
    let plugins = [];
    if(!dir) { //if undefined build first one
        dir = fs.readdirSync(path.join(process.cwd(), 'src/entrys'))[0];
    }
    let dirs = [dir];
    dirs.forEach(function(dir) {
        if(process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'debug') {
            plugins.push(new HtmlWebpackPlugin({
            /*    title: '活动',
                extraHeaders: '<meta http-equiv="x-ua-compatible" content="ie=edge">\
                                <meta http-equiv="x-dns-prefetch-control" content="on">\
		                        <meta name="format-detection" content="telephone=no,email=no,adress=no">\
		                        <meta name="description" content="Flyme GameCenter Actvity">\
		                        <!--caniuse dns-prefetch is support unkonw-->\
		                        <meta name="mobile-web-app-capable" content="yes">\
		                        <!--360-->\
		                        <meta name="renderer" content="webkit">\
		                        <!--uc-->\
		                        <meta name="imagemode" content="force">\
		                        <meta name="nightmode" content="disable">\
                                */
                inject: 'body',
                filename: 'html/index.html',
                template: path.join(config.ACTIVITY_BASE_DIR, `./entrys/${dir}`, 'index.html'),
                chunks: ['vendor', dir],
                minify: {
                    minifyCSS: true,
                    minifyJS: true,
                    collapseInlineTagWhitespace: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    removeComments: false
                },
                IS_DEV: process.env.NODE_ENV == 'debug',
                injectData: injectHTMLData,
                cache: false 
            }));
        } else {
            plugins.push(new HtmlWebpackPlugin({
               /* title: 'Flyme游戏中心活动',*/
                inject: 'body',
                template: path.join(config.ACTIVITY_BASE_DIR, `./entrys/${dir}`, 'index.html'),
                chunks: ['vendor', dir],
                minify: false,
                IS_DEV: true
            }));
        }
    });
    return plugins
}