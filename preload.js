// Imports
const { Titlebar, Color } = require('custom-electron-titlebar');
const path = require('path');
const { ipcRenderer } = require('electron');

// Titlebar
let titlebar;

window.addEventListener('DOMContentLoaded', () => {
  titlebar = new Titlebar({
    backgroundColor: Color.fromHex("#20222500"),
    itemBackgroundColor: Color.fromHex("#12121200"),
    svgColor: Color.WHITE
  });
});
