window.oncontextmenu = function() { return false; }

var restartRequired = "<div class='error-message'><img src='./6e97f6643e7df29b26571d96430e92f4.svg' width='100' height='100'> <p class='error-text'>Some changes require restart</p><p class='error-text'>Restart dragoncord now for apply changes</p> </img></div>";
var warningNotFinished = "<div class='warning'><img src='./6e97f6643e7df29b26571d96430e92f4.svg' width='100' height='100'> <p class='warning-text'>Warning: It's still not yet finished</p><p class='not-finished-text'>and can start working unproperty</p> </img></div>";
var demoWarning = "<div class='warning'><img src='./6e97f6643e7df29b26571d96430e92f4.svg' width='100' height='100'> <p class='warning-text'>This just a demo</p><p class='warning-text'>The demo version will be different from the release version</p> </img></div>";
var copiedHtml = "<p class='black'>Copied!</p>";

var xhr = new XMLHttpRequest();

async function makeRequest(method, url) {
    console.log('%c [makeRequest] ' + method + ' | ' + url, 'color: #ede442')
    xhr.open(method, url);
    xhr.responseType = null;
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.send();
    if(xhr.readyState == 4 && xhr.status == 200) {
        console.log('%c [makeRequest] ' + xhr.responseText, 'color: #59ed42');
        return false;
	}
    else {
        //console.log('%c [makeRequest] ' + xhr.responseText, 'color: #ed4842');
    	return true;
    }
}

window.onerror = function renderError(msg, url, lineNo, columnNo, error) {
	document.getElementById('settings-content').innerHTML = "<h1>Render settings failed :(</h1><div class='error-message'><img src='./6e97f6643e7df29b26571d96430e92f4.svg' width='100' height='100'> <p class='error-text'>Oof.. Something is broken! Render failed. There is information about the error below.</p> </img></div> <div class='settings-error'><h1>Message</h1>" + msg + "<h1>URL</h1>" + url + "<h1>Error line number</h1>" + lineNo + "<h1>Error column number</h1>" + columnNo + "<h1>Error</h1>" + error + "</div>";
}

function updateDragoncord() {
    console.log("[Updater] Updating");
    makeRequest("GET", "http://127.0.0.1:8723/api/dragoncord/update");
    console.log("[Updater] Finished");
}

function about() {
	buildInfo = "Build 13.05.2022 | Branch: Dev | User-Agent: " + navigator.userAgent;
    document.getElementById('settings-content').innerHTML = "<h1>About</h1>" + warningNotFinished +"<p>" + "</p><p id='user-agent'>Your user-agent in debug info</p><p>Repository: <a href='https://github.com/Dragoncord-for-discord/dragoncord'>https://github.com/Dragoncord-for-discord/dragoncord</a></p><h1>Author of idea and Developer</h1><img src='https://cdn.discordapp.com/avatars/957240995169337395/0eaa4683303f429e72f8b4ae19a63b37.webp?size=512' height='32' width='32' class='avatar'>ДраконОгонь 🐲#8392</img><br><br><button onclick='navigator.clipboard.writeText(buildInfo);DragoncordAPI.showNotification(copiedHtml);'>Copy debug info to clipboard</button>";
}

function settings() {
	var settingsString = "<h1>Settings</h1>" + warningNotFinished + "<br>";
    document.getElementById('settings-content').innerHTML = settingsString;
}

function plugins_list() {
	if (makeRequest("GET", "http://127.0.0.1:8723/api/get/plugins") == false) {
    	document.getElementById('settings-content').innerHTML = "<h1>Plugins</h1>" + warningNotFinished + "<p id='plugins-list'>Loaded</p>";
    }
    else {
        document.getElementById('settings-content').innerHTML = "<h1>Render settings failed :(</h1><div class='error-message'><img src='./6e97f6643e7df29b26571d96430e92f4.svg' width='100' height='100'> <p class='error-message-text'>Oof.. Something is broken! Render failed. There is information about the error below.</p> </img></div> <div class='settings-error'><h1>Message</h1>" + "Parse failed" + "<h1>URL</h1>" + "<p>http://127.0.0.1:8723/api/get/plugins</p> <p>main.js</p>" + "<h1>Error line number</h1>" + "7" + "<h1>Error column number</h1>" + "0" + "<h1>Error</h1>" + "Request failed" + "</div>";
    }
}

var dragoncord_config = "<div class='pluginCard'><h1>dragoncord-config</h1><p>License: MIT</p> <p>Author: DragonFire</p> <p>Description: Customize Dragoncord to fit your needs!</p> </div>"
var discordexperiments = "<div class='pluginCard'><h1>discordexperiments</h1><p>License: MIT</p> <p>Author: DragonFire</p> <p>Description: Enables Discord Experiments and Developer tab</p></div>"

var pluginsDemoList = "<p id='plugins-list'>" + dragoncord_config + "</p>"
var pluginsDemo = "<h1>Plugins (Demo)</h1>" + demoWarning + pluginsDemoList + discordexperiments;

function plugins_list_demo() {
    document.getElementById('settings-content').innerHTML = pluginsDemo;
}

function themes_list() {
	if (makeRequest("GET", "http://127.0.0.1:8723/api/get/themes") == false) {
        var themesLineCode = document.getElementById('settings-content').innerHTML = "<h1>Themes</h1>" + warningNotFinished + "<p id='themes-list'>Loading, please wait...</p>";
    }
    else {
        document.getElementById('settings-content').innerHTML = "<h1>Render settings failed :(</h1><div class='error-message'><img src='./6e97f6643e7df29b26571d96430e92f4.svg' width='100' height='100'> <p class='error-message-text'>Oof.. Something is broken! Render failed. There is information about the error below.</p> </img></div> <div class='settings-error'><h1>Message</h1>" + "Parse failed" + "<h1>URL</h1>" + "<p>http://127.0.0.1:8723/api/get/plugins</p> <p>main.js</p>" + "<h1>Error line number</h1>" + "7" + "<h1>Error column number</h1>" + "0" + "<h1>Error</h1>" + "Request failed" + "</div>";
    }
}

function updater() {
    document.getElementById('settings-content').innerHTML = "<h1>Updater</h1>" + warningNotFinished + "<br>" + restartRequired + "<br>" + "<button onclick='updateDragoncord();'>Update Dragoncord (This requires runned local python server)</button>";
}

var clicked = 0;

function dont_click_me() {
    clicked++;
    if (clicked == 1) {
        document.getElementById('settings-content').innerHTML = "<h1>DON'T CLICK ME</h1> <p>Are you sure?</p>";
    }
    if (clicked == 2) {
        document.getElementById('settings-content').innerHTML = "<h1>DON'T CL1CK ME</h1> <p>Really?</p>";
    }
    if (clicked == 3) {
        document.getElementById('settings-content').innerHTML = "<h1>D0N'T CL1CK mE</h1> <p>St0p ThIs!</p>";
    }
    if (clicked == 4) {
        document.getElementById('settings-content').innerHTML = "<h1>D0n'T CL1CK mE</h1> <p>St000oo0O00Op TnIz pls</p>";
    }
    if (clicked == 5) {
        document.getElementById('settings-content').innerHTML = "<h1>D0n'T cL1CK mE</h1> <p>N0</p>";
    }
    if (clicked == 6) {
        document.getElementById('settings-content').innerHTML = "<h1>D0n'T cL1CK mE</h1> <p>DON'T CLICK AGAIN</p>";
    }
    if (clicked == 7) {
        document.getElementById('body').innerHTML = "<div class='settings-options'><h3 class='header'>Settings was crashed</h3></div> <div id='settings-content'><p style='padding-left: 6px;'>Content failed to show</p></div>";
    }
}