// Plugins

// const you_plugin_name = require('./dcord_node_plugins/you_plugin_name.js');

// Titlebar
const { Titlebar, Color } = require('custom-electron-titlebar');
const path = require('path');
var config = require('./config.json');

let titlebar;

window.addEventListener('DOMContentLoaded', () => {
  titlebar = new Titlebar({
    backgroundColor: Color.fromHex("#36393F"),
    itemBackgroundColor: Color.fromHex("#121212"),
    svgColor: Color.WHITE
  })
})