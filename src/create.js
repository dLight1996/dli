const path = require("path");
const fs = require("fs-extra");
const Inquirer = require("inquirer");
const {loading, downloadRepo} = require('./api')
const chalk = require("chalk");

module.exports = async function (projectName, options) {
    // 获取当前工作目录
    const cwd = process.cwd();
    const targetDirectory = path.join(cwd, projectName);

    if (fs.pathExistsSync(targetDirectory)) {
        if (options.force) {
            // 删除重名目录
            await fs.remove(targetDirectory);
            await downloadRepo(targetDirectory)
        } else {
            let { isOverwrite } = await new Inquirer.prompt([
                // 返回值为promise
                {
                    name: "isOverwrite", // 与返回值对应
                    type: "list", // list 类型
                    message: "Target directory exists, Please choose an action",
                    choices: [
                        { name: "Overwrite", value: true },
                        { name: "Cancel", value: false },
                    ],
                },
            ]);
            if (!isOverwrite) {
                console.log(chalk.red('cancel create!'))
            } else {
                await fs.remove(targetDirectory);
                await downloadRepo(targetDirectory)
            }
        }
    }
    else {
        await downloadRepo(targetDirectory)
    }
};
