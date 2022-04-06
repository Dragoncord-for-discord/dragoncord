var config = require('./config.json');

// Libs
const { app, BrowserWindow, webContents, Menu, Tray, BrowserView } = require('electron');
const path = require('path');
const fs = require("fs");
const open = require('open');
const { setupTitlebar, attachTitlebarToWindow, Titlebar } = require("custom-electron-titlebar/main");
const spawnObj = require('child_process').spawn;

setupTitlebar();

if (config.NODE_INTEGRATION == false) { console.warn('\x1b[43m \x1b[30m', 'WARN', '\x1b[0m', 'You running Dragoncord without nodeIntegration. This can make some problems and errors!'); } 

console.log('Dragoncord By DragonFire | Web Client | Alpha 28.03.2022');
console.log('Endpoint: ' + config.DCORD_ENDPOINT);

let main;

// Window
function createWindow() {
  const main = new BrowserWindow({
    width: config.DEFAULT_WIDTH,
    height: config.DEFAULT_HEIGHT,
    backgroundColor: config.BACKGROUND_COLOR,
    icon: config.APP_ICON,
    darkTheme: true,
    frame: false,
    webPreferences: {
      title: config.WEBAPP_TITLE,
      preload: path.join(__dirname, 'preload.js'),
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
  require("@electron/remote/main").enable(main.webContents);

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
  attachTitlebarToWindow(main);
  var menu = Menu.buildFromTemplate([
  {
    label: 'Dragoncord',
    submenu: [
    {
      label: 'Config', 
      click() { 
        spawnObj('notepad.exe', ["config.json"]);
      },
      label: 'About', 
      click() {
        main.webContents.loadFile('./dragoncord/pages/about/index.html');
      }
    }]
  },
  {
    label: 'Discord Web Sites',
    submenu: [
    {
      label: 'Discord', 
      click() {
        main.webContents.loadURL('https://discord.com/app');
      }
    },
    {
      label: 'Discord PTB', 
      click() {
        main.webContents.loadURL('https://ptb.discord.com/app');
      }
    },
    {
      label: 'Discord Canary', 
      click() {
        main.webContents.loadURL('https://canary.discord.com/app');
      }
    },
    {
      label: 'Discord Status', 
      click() {
        main.webContents.loadURL('https://dis.gd/status');
      }
    },
    {
      label: "Custom: " + config.DCORD_ENDPOINT, 
      click() {
        main.webContents.loadURL(config.DCORD_ENDPOINT);
      }
    }
    ]
  },
  {
    label: 'Development',
    submenu: [
    {
      label: 'Developer Tools', 
      click() { 
        main.webContents.openDevTools();
      }
    }]
  }
  ])
  Menu.setApplicationMenu(menu); 
  main.webContents.loadURL(config.DCORD_ENDPOINT + '/app');
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
  createWindow();

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
})