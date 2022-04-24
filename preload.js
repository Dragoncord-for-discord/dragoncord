// Titlebar
const { Titlebar, Color } = require('custom-electron-titlebar');
const path = require('path');

let titlebar;

window.addEventListener('DOMContentLoaded', () => {
  titlebar = new Titlebar({
    backgroundColor: Color.fromHex("#202225"),
    itemBackgroundColor: Color.fromHex("#121212"),
    svgColor: Color.WHITE
  });
});