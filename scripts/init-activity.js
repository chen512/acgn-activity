require('shelljs/global');
const path = require('path');
const chalk = require('chalk');
if(!process.argv[2]) {
    console.error(chalk.red('require name, please use: npm run init_activity xxx'));
} else {
    let newActivity = path.join(process.cwd(), 'src/entrys', process.argv[2]);
    if(test('-d', newActivity)) {
        console.error(chalk.red('activity has existed, please checked!'));
    } else {
        cp('-r', path.join(process.cwd(), 'src/activity'), newActivity);
        console.info(chalk.green('init activity done!!!'));
    }
}
