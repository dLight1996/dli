const util = require("util");
const download = require("download-git-repo");
const ora = require("ora");

function sleep(n) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, n);
    });
}


async function loading(message, fn, ...args) {
    const spinner = ora(message);
    spinner.start(); // 开启加载
    try {
        let executeRes = await fn(...args);
        spinner.succeed('success!');
        return executeRes;
    } catch (error) {
        spinner.fail("request fail, reTrying");
        await sleep(1000);
        return loading(message, fn, ...args);
    }
}

async function downloadRepo(target) {
    const templateUrl = 'dLight1996/base-ts-webpack-template#main'
    await loading('downloading template, please wait', util.promisify(download), templateUrl, target,{
        clone: true
    })
}

module.exports = {
    loading,
    sleep,
    downloadRepo
};
