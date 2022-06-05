console.log('[Dragoncord] Please wait, we are loading :)');

const Sentry = require("@sentry/electron");
Sentry.init({ dsn: "https://40ded2891df94cbab50bc7d3b14a8270@o1216346.ingest.sentry.io/6365775" });

var config = require('./config.json');

// Libs
const {
	app,
	BrowserWindow,
	Menu,
	Tray,
	session,
	ipcMain,
	ipcRenderer,
	desktopCapturer,
	Notification
} = require('electron');
const path = require('path');
const fs = require("fs");
const open = require('open');
const { spawn } = require("child_process");
const { win32 } = require('path');
const { exit } = require('process');
const { setupTitlebar, attachTitlebarToWindow } = require("custom-electron-titlebar/main");
const wrtc = require('electron-webrtc')({ headless: true });

app.commandLine.appendSwitch('ignore-certificate-errors');
app.commandLine.appendSwitch('enable-webrtc-h264-with-openh264-ffmpeg');
app.commandLine.appendSwitch('WebRTCPipeWireCapturer');

process.env.WebRTCPipeWireCapturer = 1;
process.env.PULSE_LATENCY_MSEC = 30;
//process.env.PIPEWIRE_LATENCY = 30;
//process.env.ELECTRON_ENABLE_LOGGING = 1;

const myArgs = process.argv.slice(2); // Args

switch (myArgs[0]) {
  case 'dragoncord-save-mode':
    console.log('\x1b[46m \x1b[30m', 'Dragoncord', '\x1b[0m', 'Save mode enabled! Plugins and themes load disabled');
    var savemode = true;
    var pluginsAndThemesLoadEnabled = false;
    break;
  default:
  	var savemode = false;
    var pluginsAndThemesLoadEnabled = true;
}

if (process.platform == "win32") {
	setupTitlebar();
}

if (process.platform == "win32") { console.log("\x1b[42m", "OK", "\x1b[0m" + " Running on win32"); }
else { console.warn('\x1b[43m \x1b[30m', 'WARN', '\x1b[0m', ' Dragoncord is running.. Not on win32 (Windows). Dragoncord was not be tested on you platform (' + process.platform + ')'); }

let main;

function start_failed(error_message) {
  console.error('[START FAILED] Dragoncord Start Failed!');
  console.error('[START FAILED] ' + error_message);
  //throw new Error('Start failed. ' + error_message)
  process.exit();
}

fs.readdir('./dragoncord', function (err, files) {
	if (err) {
		start_failed("/dragoncord is missing! Please redownload Dragoncord!");
	}
	else {
		if (!files.length) {
			start_failed("/dragoncord folder is empty! Please redownload Dragoncord!");
		}
	}
});

console.log('Dragoncord By DragonFire | Web Client');
console.log('Endpoint: ' + config.DCORD_ENDPOINT);
// Window
function createWindow() {
  const main = new BrowserWindow({
    width: config.DEFAULT_WIDTH,
    height: config.DEFAULT_HEIGHT,
    backgroundColor: config.BACKGROUND_COLOR,
    icon: config.APP_ICON,
    darkTheme: true,
    frame: false,
    center: true,
    webPreferences: {
      title: config.WEBAPP_TITLE,
      preload: path.join(__dirname, 'preload.js'),
      // Secure options
      allowRunningInsecureContent: config.ALLOW_RUNNING_INSECURE_CONTENT,
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
      contextIsolation: true,
      //webSecurity: false,
      // Settings
      experimentalFeatures: config.EXPERIMENTAL_FEATURES,
      experimentalCanvasFeatures: config.EXPERIMENTAL_FEATURES,
      directWrite: config.DIRECT_WRITE,
      enableRemoteModule: config.ENABLE_REMOTE_MODULE,
      devTools: config.DEVELOPER_TOOLS,
      javascript: config.JAVASCRIPT,
      webgl: config.ENABLE_WEBGL,
      plugins: config.PLUGINS,
      webaudio: config.ENABLE_WEBAUDIO,
      enableWebSQL: config.ENABLE_WEBSQL,
      webviewTag: config.WEBVIEW_TAG
    }
  });
  if (process.platform == "win32") {
	require("@electron/remote/main").enable(main.webContents);
  }

  main.webContents.setAudioMuted(false);
  //main.webContents.setUserAgent("Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.46 Chrome/91.0.4472.164 Electron/13.6.6 Safari/537.36")

  function load_plugins() {
  	if (pluginsAndThemesLoadEnabled == true) {
  		// Dragoncord
      	fs.readdir('./dragoncord/js', function (err, files) {
	        if (err) {
	          	console.log('[Error] Unable to scan directory: ' + err);
	          	start_failed("/dragoncord/css/ is missing! Please redownload Dragoncord!");
	        }
	        else {
	        	if (!files.length) {
	            	console.log('[Dragoncord JS] Folder is empty');
	            	start_failed("/dragoncord/css/ folder is empty! Please redownload Dragoncord!");
	          	}
	          	else {
	            	files.forEach(function (file) {
	              		const pluginsToLoad = fs.readFileSync('./dragoncord/js/' + file).toString();
	              		main.webContents.executeJavaScript(pluginsToLoad);
	              		console.log('[Dragoncord JS] Loaded: ' + file);
	            	});
	          	}
	        }
        });

        fs.readdir('./dragoncord/css', function (err, files) {
			if (err) {
				console.log('[Error] Unable to scan directory: ' + err);
            	start_failed("/dragoncord/css/ is missing! Please redownload Dragoncord!");
          	}
          	else {
            	if (!files.length) {
            		console.log('[Dragoncord CSS] Folder is empty');
            	    start_failed("/dragoncord/css/ folder is empty! Please redownload Dragoncord!");
            	}
            	else {
              	files.forEach(function (file) {
                	const themeToLoad = fs.readFileSync('./dragoncord/css/' + file).toString();
                	main.webContents.insertCSS(themeToLoad);
                	console.log('[Dragoncord CSS] Loaded: ' + file);
              	});
            }
        }});

        // Node Plugins
        fs.readdir('./dcord_node_plugins', function (err, files) {
          if (err) {
            console.log('[Error] Unable to scan directory: ' + err);
          }
          else {
            if (!files.length) {
            	main.webContents.executeJavaScript("console.log('[Node Plugin] Folder is empty');");
            	console.log('[Node Plugin] Folder is empty');
            }
            else {
            	files.forEach(function (file) {
            		require('./dcord_node_plugins/' + file + '/' + 'main.js');
                	main.webContents.executeJavaScript("console.log('[Node Plugin] Loaded: " + file + "');");
                	//main.webContents.executeJavaScript('DragoncordAPI.showNotification("[Node Plugin] ' + file + ' loaded!");')
                	console.log('[Node Plugin] Loaded: ' + file);
            	});
            }
          }
        });

        // Plugins
        fs.readdir('./plugins', function (err, files) {
          if (err) {
            console.log('[Error] Unable to scan directory: ' + err);
          }
            else {
              if (!files.length) {
              	main.webContents.executeJavaScript("console.log('[Plugin] Folder is empty');");
              	console.log('[Plugin] Folder is empty');
              }
              else {
                files.forEach(function (file) {
                	const pluginsToLoad = fs.readFileSync('./plugins/' + file + '/' + 'main.js').toString();
                	main.webContents.executeJavaScript(pluginsToLoad);
                	main.webContents.executeJavaScript("console.log('[Plugin] Loaded: " + file + "');");
                	//main.webContents.executeJavaScript('DragoncordAPI.showNotification("[Plugin] ' + file + ' loaded!");')
                	console.log('[Plugin] Loaded: ' + file);
                });
              }
            }
        });

        // Themes
        fs.readdir('./themes', function (err, files) {
          if (err) {
            console.log('[Error] Unable to scan directory: ' + err);
          }
            else {
              if (!files.length) {
              	main.webContents.executeJavaScript("console.log('[Theme] Folder is empty');");
              	console.log('[Theme] Folder is empty');
              }
              else {
                files.forEach(function (file) {
                  const themeToLoad = fs.readFileSync('./themes/' + file + '/' + 'main.css').toString();
                  main.webContents.insertCSS(themeToLoad);
                  main.webContents.executeJavaScript("console.log('[Theme] Loaded: " + file + "');");
                  //main.webContents.executeJavaScript('DragoncordAPI.showNotification("[Theme] ' + file + ' loaded!");')
                  console.log('[Theme] Loaded: ' + file);
                });
              }
            }
        });
	    }
	  else {
	    console.log('Plugins and themes not loaded. Save mode enabled');
	  }
	}

  console.log('[Dragoncord] Loading...');
  load_plugins();
  
  // Settings
  main.setKiosk(config.KIOSK);
  main.setOpacity(config.WINDOW_OPACITY);
  main.setAlwaysOnTop(config.ALWAYS_ON_TOP);

  if (process.platform == "win32") {
  	attachTitlebarToWindow(main);
  }

  var menu = Menu.buildFromTemplate([
  {
    label: 'Dragoncord',
    submenu: [
    {
    	label: 'Dragoncord Bot',
    	click() {
    		main.webContents.loadURL('https://ptb.discord.com/oauth2/authorize?client_id=966364765372968980&permissions=8&scope=bot%20applications.commands')
    	}
    },
    {
      label: 'Settings', 
      click() {
        main.webContents.loadFile('./dragoncord/pages/settings/index.html');
      }
    },
    {
      label: 'Config', 
      click() {
        spawn('notepad.exe', ["config.json"]);
      }
    },
    {
      label: 'Reload', 
      click() {
        main.webContents.reload();
        load_plugins();
      }
    },
    {
      label: 'Reload plugins/themes',
      accelerator: process.platform === 'darwin' ? 'Alt+Cmd+Z' : 'Alt+Shift+Z',
      click() {
        load_plugins();
      }
    },
    {
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
        load_plugins();
      }
    },
    {
      label: 'Discord PTB', 
      click() {
        main.webContents.loadURL('https://ptb.discord.com/app');
        load_plugins();
      }
    },
    {
      label: 'Discord Canary', 
      click() {
        main.webContents.loadURL('https://canary.discord.com/app');
        load_plugins();
      }
    },
    {
      label: 'Discord Status', 
      click() {
        main.webContents.loadURL('https://dis.gd/status');
      }
    },
    {
      label: 'Discord Support', 
      click() {
        main.webContents.loadURL('https://support.discord.com');
      }
    },
    {
      label: "Custom: " + config.DCORD_ENDPOINT, 
      click() {
        main.webContents.loadURL(config.DCORD_ENDPOINT + '/app');
        load_plugins();
      }
    }
    ]
  },
  {
    label: 'Tools',
    submenu: [
    {
      label: 'Clear Cache',
      click() { 
        main.webContents.session.clearCache();
      }
    },
    {
      label: 'Clear Auth Cache',
      click() { 
        main.webContents.session.clearAuthCache();
      }
    },
    {
      label: 'Clear Storage Data',
      click() {
        main.webContents.session.clearStorageData()
      }
    }
    ]
  },
  {
    label: 'Development',
    submenu: [
    {
      label: 'Developer Tools',
      accelerator: process.platform === 'darwin' ? 'Ctrl+Cmd+C' : 'Ctrl+Shift+C',
      click() { 
        main.webContents.openDevTools();
      }
    }
    ]
  }
  ])
  Menu.setApplicationMenu(menu);

  // WebRTC and Voice
  main.webContents.setWebRTCIPHandlingPolicy("default_public_and_private_interfaces")
  session.fromPartition("default").setPermissionRequestHandler((webContents, permission, callback) => {callback(true);});
  //session.fromPartition(session.defaultSession).setPermissionRequestHandler((webContents, permission, callback) => {callback(true);});

  // Anti-Telemetry
  main.webContents.session.webRequest.onBeforeRequest(
  {
    urls: [
      //'https://*/api/*/channels/*/typing',
      'https://*/api/*/science',
      'https://*/api/*/track'
    ]
  },
  (details, callback) => {
  	const url = new URL(details.url);
  	if (url.pathname.endsWith('/science') || url.pathname.endsWith('/track')) { console.debug('[Anti-Telemetry] Blocking ' + url.pathname); return callback({cancel: true});} 
    //else if (url.pathname.endsWith('/typing')) { console.debug('[Dragoncord] Typing disabled: ' + url.pathname); return 0;}
  	else { console.debug('[Anti-Telemetry] Blocking ' + url.pathname); return callback({cancel: true}); }
  },
  );

  // Plugins/themes fix
  main.webContents.on('did-finish-load', () => {
    load_plugins();
  });

  main.webContents.on("did-fail-load", function() {
    main.webContents.loadFile('./dragoncord/pages/status/offline.html');
  });
  console.log('[Discord] Loading Discord');
  main.loadURL(config.DCORD_ENDPOINT + "/app");
  //main.loadURL('https://www.whatsmybrowser.org/'); // Used for testing
  //main.webContents.loadFile('./dragoncord/pages/splashscreen/index.html');
}

// ipc Events
ipcMain.handle("DESKTOP_CAPTURER_GET_SOURCES", (event, opts) => desktopCapturer.getSources(opts));
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

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('blur', () => {
  main.blurWebView();
});

//ipcRenderer.on("*", console.log('[ipcRenderer] detected'));

// Load App
app.whenReady().then(() => {
  console.log("[Electron JS] App is ready! Starting...");

  // Tray
  tray = new Tray(config.TRAY_ICON);
  const contextMenu = Menu.buildFromTemplate([
    { label: config.WEBAPP_TITLE, enabled: false, icon: 'dragoncord/discord/images/tray.png' },
    { type: "separator" },
    { label: 'Relaunch', click: function () { app.quit(); app.relaunch(); } },
    { label: 'Acknowledgements', click: function () { open(config.DCORD_ENDPOINT + '/acknowledgements'); } },
    { type: "separator" },
    { label: 'Quit ' + config.WEBAPP_TITLE, click: function () { app.quit(); } }
  ])
  tray.setToolTip(config.WEBAPP_TITLE);
  tray.setTitle(config.WEBAPP_TITLE);
  tray.setContextMenu(contextMenu);

  createWindow();
});