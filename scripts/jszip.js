//打包build文件为zip
const JSZip = require("jszip");
const Config = require('../src/config');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

function  formatDate(date, format) {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  };

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
        : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
};
let activityName = '';
if(process.argv[2]) {
   activityName = process.argv[2];
}
let name = activityName+formatDate(new Date(), 'yyyyMMdd-hhmmss');

function zipDir(dir, zip) {
  fs.readdirSync(dir).forEach((file) => {
    let _file = path.join(dir, file);
    if(fs.statSync(_file).isDirectory()) {
      let _zip = zip.folder(file)
      zipDir(_file, _zip);
    } else {
      zip.file(file, fs.readFileSync(_file));
    }
  })
}
exports.buildZip = function() {
  let zip = new JSZip();
  zipDir(Config.ACTIVITY_BUILD_DIR, zip);
  console.log(chalk.yellow('正在导出活动.....!'));
  if(!fs.existsSync(Config.ACTIVITY_OUTPUT_DIR)) {
    console.log(chalk.red('创建output目录...'));
    fs.mkdirSync(Config.ACTIVITY_OUTPUT_DIR);
  }

  zip.generateNodeStream({type:'nodebuffer', streamFiles:true, compression: 'DEFLATE'})
  .pipe(fs.createWriteStream(path.join(Config.ACTIVITY_OUTPUT_DIR, `${name}.zip`)))
  .on('finish', function () {
    console.log(chalk.yellow('导出成功！'));
  });
}



