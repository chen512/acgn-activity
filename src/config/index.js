const _process = process;
const path = require('path');
const os = require('os');
const fs = require('fs');
const IS_PRODUCTION = _process.env.NODE_ENV != 'dev';
const DIST_DIR = path.join(process.cwd(), 'dist');
const INTERNAL_SERVER_PORT = 8094;
const ips = getLocalIps();
const IP = ips.length ? ips[0] : '127.0.0.1'
const INTERNAL_SERVER_HOST = `http://${IP}:${INTERNAL_SERVER_PORT}`;

let NODE_MODULES_DIR = path.join(process.cwd(),'node_modules');

const ACTIVITY_BUILD_DIR = path.join(DIST_DIR, 'build');
const ACTIVITY_OUTPUT_DIR = path.join(DIST_DIR, 'output');
const ACTIVITY_BASE_DIR = path.join(process.cwd(), 'src');
const NODE_MODULES = NODE_MODULES_DIR;
const COMPONENTS_DIR = path.join(process.cwd(),'src/components');

function getLocalIps() {
    var os = require('os');
    var interfaces = os.networkInterfaces();
    var addresses = [];
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }
    return addresses;
}

module.exports = {
    INTERNAL_SERVER_PORT, //内部服务器端口
    INTERNAL_SERVER_HOST, //内部服务器HOST
    ACTIVITY_BUILD_DIR, //活动打包构建目录
    ACTIVITY_BASE_DIR, //src目录
    ACTIVITY_OUTPUT_DIR, //活动导出目录
    DIST_DIR,
    NODE_MODULES, 
    COMPONENTS_DIR
}