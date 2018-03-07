### 目录结构

```
.
├── README.md
├── dist   //活动导出目录  output:zip包导出目录
├── node_modules
├── package.json
├── plugins   //插件
├── scripts  //构建脚本目录
└── src
      ├── activity
      ├── assets
      ├── cache
      ├── components  //game-open组件库
      ├── config      //配置目录
      ├── entrys      //每个活动代码在这里
      └── mock        //本地API mock
```

### 项目初始化
```

  npm run init_activity xxx   //xxx代表活动名称

  npm run dev xxx  //本地服务器 127.0.0.1:8094 访问  xxx代表活动名称，为空:默认第一个

  npm run build xxx  //生产环境构建  xxx代表活动名称，为空:默认第一个

```
### 重点注意！！
必须把npm升级到最新 执行命令npm install npm@latest -g 
