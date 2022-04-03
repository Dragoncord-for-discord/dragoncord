var config = require('./config.json');

console.log('Dragoncord By DragonFire | Web Client | Alpha 28.03.2022');
console.log('Endpoint: ' + config.DCORD_ENDPOINT)

// Libs
const { app, BrowserWindow, webContents, Menu, Tray } = require('electron');
const path = require('path');
const fs = require("fs");
const open = require('open');

// Window

const mainWindow = () => {
  const main = new BrowserWindow({
    width: config.DEFAULT_WIDTH,
    height: config.DEFAULT_HEIGHT,
    //frame: false,
    backgroundColor: config.BACKGROUND_COLOR,
    icon: config.APP_ICON,
    darkTheme: true,
    webPreferences: {
      title: config.WEBAPP_TITLE,
      // Secure options
      allowRunningInsecureContent: config.ALLOW_RUNNING_INSECURE_CONTENT,
      //contextIsolation: false,
      nodeIntegration: config.NODE_INTEGRATION,
      nodeIntegrationInWorker: config.NODE_INTEGRATION,
      nodeIntegrationInSubFrames: config.NODE_INTEGRATION,
      //webSecurity: false,
      // Settings
      experimentalFeatures: config.EXPERIMENTAL_FEATURES,
      experimentalCanvasFeatures: config.EXPERIMENTAL_FEATURES,
      directWrite: true,
      enableRemoteModule: true,
      devTools: config.DEVELOPER_TOOLS,
      javascript: true,
      webgl: config.ENABLE_WEBGL,
      plugins: true,
      webaudio: config.ENABLE_WEBAUDIO,
      enableWebSQL: config.ENABLE_WEBSQL
    }
  })

  // Dragoncord
  fs.readdir('./dragoncord/js', function (err, files) {
    if (err) {
      console.log('[Error] Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
      const pluginsToLoad = fs.readFileSync('./dragoncord/js/' + file).toString();
      main.webContents.executeJavaScript(pluginsToLoad);
      console.log('[Dragoncord JS] Loaded: ' + file);
    });
  });

  fs.readdir('./dragoncord/css', function (err, files) {
    if (err) {
      console.log('[Error] Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
      const themeToLoad = fs.readFileSync('./dragoncord/css/' + file).toString();
      main.webContents.insertCSS(themeToLoad);
      console.log('[Dragoncord CSS] Loaded: ' + file);
    });
  });

  // Plugins
  fs.readdir('./plugins', function (err, files) {
    if (err) {
      console.log('[Error] Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
      const pluginsToLoad = fs.readFileSync('./plugins/' + file).toString();
      main.webContents.executeJavaScript(pluginsToLoad);
      console.log('[Plugin] Loaded: ' + file);
    });
  });

  // Themes
  fs.readdir('./themes', function (err, files) {
    if (err) {
      console.log('[Error] Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
      const themeToLoad = fs.readFileSync('./themes/' + file).toString();
      main.webContents.insertCSS(themeToLoad);
      console.log('[Theme] Loaded: ' + file);
    });
  });

  console.log('[Discord] Starting Discord');
  // Settings
  main.setKiosk(config.KIOSK);
  main.setOpacity(config.WINDOW_OPACITY);
  main.setAlwaysOnTop(config.ALWAYS_ON_TOP);

  // Loads Discord
  main.loadURL(config.DCORD_ENDPOINT + '/app');
}

// Events
app.on('unresponsive', (e) => {
  console.log('[Error] Dragoncord has detected an error. Dragoncord does not seem to be responding.');
});

app.on('crashed', (e) => {
  console.log('[Error] Dragoncord is crashed! Restarting...');
  app.relaunch();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
})

app.on('minimize', () => {
  main.blurWebView();
})

// Load App
app.whenReady().then(() => {
  mainWindow();

  // Tray
  tray = new Tray(config.TRAY_ICON)
  const contextMenu = Menu.buildFromTemplate([
    { label: config.WEBAPP_TITLE, enabled: false },
    { type: "separator" },
    { label: 'Acknowledgements', click: function () { open(config.DCORD_ENDPOINT + '/acknowledgements'); } },
    { type: "separator" },
    { label: 'Quit ' + config.WEBAPP_TITLE, click: function () { app.quit(); } }
  ])
  tray.setToolTip(config.WEBAPP_TITLE)
  tray.setTitle(config.WEBAPP_TITLE)
  tray.setContextMenu(contextMenu)

  // Run
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
})