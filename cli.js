#!/usr/bin/env node

const chalk = require('chalk')
const program = require('commander')
const pkg = require('./package.json')
const fs = require('fs-extra')

let projectName

program
  .version(pkg.version)
  .arguments('<project-name>')
  .usage(`${chalk.bgGreen.black('<project-name>')}`)
  .action(function(name) {
    projectName = name
  })
  .parse(process.argv)

const createPrismaApp = (projectName) => {
  try {
    fs.copySync('./templates', `${process.cwd()}/${projectName}`)
    console.log('success!')
  } catch (err) {
    console.error(err)
  }
}

if (/^([A-Za-z\-\_\d])+$/.test(projectName)) createPrismaApp(projectName)
else console.log(chalk.bgRed.white('invalid project name'))
