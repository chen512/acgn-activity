require('shelljs/global');
const path = require('path');
const chalk = require('chalk');
if(!process.argv[2] || !process.argv[2].replace('game-open=', '')) {
    console.error(chalk.red('require game-open project, please use: npm run init game-open=xxxx'));
} else {
    let gameOpenProject = process.argv[2].replace('game-open=', '');
    if(!test('-d', gameOpenProject)) {
        console.error(chalk.red('game-open project not exist!'));
    } else {
        ln('-s', path.join(gameOpenProject, 'src/app/components'), path.join(process.cwd(), 'src/components'));
        ln('-s', path.join(gameOpenProject, 'src/app/mock'), path.join(process.cwd(), 'src/mock'));
        ln('-s', path.join(gameOpenProject, 'src/plugins'), path.join(process.cwd(), 'plugins'));
        console.info(chalk.green('link dirs done!!!'));
    }
}

