require("node-plugins.js");
console.log("[Dragoncord] Loading...");
//const node_plugins = require("node-plugins.js");
const Module = require('module');
const { join, dirname } = require('path');
const { existsSync, unlinkSync } = require('fs');

// Restore the classic path; The updater relies on it and it makes Discord go corrupt
const electronPath = require.resolve('electron');
const discordPath = join(dirname(require.main.filename), '..', 'app.asar');
require.main.filename = join(discordPath, 'app_bootstrap/index.js');

const electron = require('electron');

require("C:\\Users\\denis\\AppData\\Local\\Discord\\app-1.0.9005\\resources\\app\\node-plugins.js");

const discordPackage = require(join(discordPath, 'package.json'));
electron.app.setAppPath(discordPath);
electron.app.name = discordPackage.name;

electron.setAppLogsPath("D:\\Desktop1\\dragoncord\\injectors\\discord-logs");

Module._load(join(discordPath, discordPackage.main), null, true);