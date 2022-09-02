const Module = require('module');
const { join, dirname } = require('path');
const fs = require('fs');
//const { existsSync, unlinkSync, readdir } = require('fs');

// Restore the classic path; The updater relies on it and it makes Discord go corrupt
const electronPath = require.resolve('electron');
const discordPath = join(dirname(require.main.filename), '..', 'app.asar');
require.main.filename = join(discordPath, 'app_bootstrap/index.js');

const electron = require('electron');
const {
	app,
	BrowserWindow,
	Menu,
	Tray,
	session,
	ipcMain,
	ipcRenderer,
	desktopCapturer,
	Notification,
	nativeImage
} = require('electron');


console.log('[Dragoncord] Loading Dragoncord');

let _patched = false;
const appSetAppUserModelId = electron.app.setAppUserModelId;
function setAppUserModelId (...args) {
  appSetAppUserModelId.apply(this, args);
  if (!_patched) {
    _patched = true;
    //require('./updater.win32');
  }
}

electron.app.setAppUserModelId = setAppUserModelId;

if (!electron.safeStorage) {
  electron.safeStorage = {
    isEncryptionAvailable: () => false,
    encryptString: () => {
      throw new Error('Unavailable');
    },
    decryptString: () => {
      throw new Error('Unavailable');
    }
  };
}

const discordPackage = require(join(discordPath, 'package.json'));
electron.app.setAppPath(discordPath);
electron.app.name = discordPackage.name;

// ipc Events
ipcMain.handle(
  'DESKTOP_CAPTURER_GET_SOURCES',
  (event, opts) => desktopCapturer.getSources(opts)
);

ipcMain.on("restart-app", (event, message) => {
    app.quit();
    app.relaunch();
});

// Events
app.on('unresponsive', () => {
  console.log('[Error] Dragoncord has detected an error. Dragoncord does not seem to be responding.');
});

app.on('crashed', () => {
  console.log('[Error] Dragoncord is crashed! Restarting...');
  app.relaunch();
});

app.on('blur', () => {
  main.blurWebView();
});

/*
app.whenReady().then(() => {
  // Tray
  tray = new Tray("D:\\Desktop1\\dragoncord\\dragoncord\\discord\\images\\tray.png");
  const contextMenu = Menu.buildFromTemplate([
    { label: "Dragoncord", enabled: false },
    { type: "separator" },
    { label: 'Relaunch', click: function () { app.quit(); app.relaunch(); } },
    { label: 'Acknowledgements', click: function () { open('https://discord.com/acknowledgements'); } },
    { type: "separator" },
    { label: 'Quit Dragoncord', click: function () { app.quit(); } }
  ])
  tray.setToolTip("Dragoncord");
  tray.setTitle("Dragoncord");
  tray.setContextMenu(contextMenu);
});
*/

/**
 * Fix DevTools extensions for wintards
 * Keep in mind that this rather treats the symptom
 * than fixing the root issue.
 * @see https://github.com/electron/electron/issues/19468
 */
/*
if (process.platform === 'win32') {
  // todo: define if this is still necessary
  setImmediate(() => { // WTF: the app name doesn't get set instantly?
    const devToolsExtensions = join(electron.app.getPath('userData'), 'DevTools Extensions');

    if (existsSync(devToolsExtensions)) {
      unlinkSync(devToolsExtensions);
    }
  });
}*/

// Load Discord
console.log('[Discord] Loading Discord');
Module._load(join(discordPath, discordPackage.main), null, true);