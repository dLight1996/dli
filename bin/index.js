#! /usr/bin/env node

const chalk = require("chalk");
const {program} = require("commander");
const figlet = require("figlet");
const create = require('../src/create')

program
    .command("create <project-name>")
    .description("create a new project")
    .option("-f, --force", "overwrite target directory if it exists")
    .action( async (name, cmd) => {
       await create(name, cmd)
    });

program.on("--help", function () {
    console.log(
        "\r\n" +
        figlet.textSync("dli", {
            font: "3D-ASCII",
            horizontalLayout: "default",
            verticalLayout: "default",
            width: 80,
            whitespaceBreak: true,
        })
    );
    console.log();
    console.log(
        `Run ${chalk.red(
            "dli <command> --help"
        )} for detailed usage of given command.`
    );
    console.log();
});

program.version(require("../package.json").version)

program.parse(process.argv);
