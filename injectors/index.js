const { join } = require('path');
const { readFile, writeFile } = require('fs').promises;

let platformModule;
if (process.argv[2] === 'plug') {
    try {
    platformModule = require('./${process.platform}.js');
    } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
        console.log('\x1b[31m', 'Dragoncord plug failed!', '\n');
        console.log('\x1b[0m');
        console.log('It seems like your platform is not supported yet.');
        console.log('Try run plug scripts manually', '\n');
        console.log('Your platform: ' + process.platform);
    }
}}
else {
    console.log("Unknown argument: " + process.argv[2]);
}