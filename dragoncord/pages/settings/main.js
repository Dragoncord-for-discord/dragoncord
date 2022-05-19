var restartRequired = "<div class='restart-required'><img src='./6e97f6643e7df29b26571d96430e92f4.svg' width='100' height='100'> <p class='require-restart-text'>Some changes require restart</p><p class='require-restart-text'>Restart dragoncord now for apply changes</p> </img></div>";
var warningNotFinished = "<div class='not-finished'><img src='./6e97f6643e7df29b26571d96430e92f4.svg' width='100' height='100'> <p class='not-finished-text'>Warning: It's still not yet finished</p><p class='not-finished-text'>and can start working unproperty</p> </img></div>";
var copiedHtml = "<p class='black'>Copied!</p>";

var xhr = new XMLHttpRequest();

async function makeRequest(method, url) {
    console.log('[makeRequest] ' + method + ' | ' + url)
    xhr.open(method, url);
    xhr.responseType = null;
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.send();
    if(xhr.readyState == 4 && xhr.status == 200) {
        console.log('[makeRequest] ' + xhr.responseText);
        return false;
	}
    else {
    	return true;
    }
}

window.onerror = function renderError(msg, url, lineNo, columnNo, error) {
	document.getElementById('settings-content').innerHTML = "<h1>Render settings failed :(</h1><div class='error-message'><img src='./6e97f6643e7df29b26571d96430e92f4.svg' width='100' height='100'> <p class='error-message-text'>Oof.. Something is broken! Render failed. There is information about the error below.</p> </img></div> <div class='settings-error'><h1>Message</h1>" + msg + "<h1>URL</h1>" + url + "<h1>Error line number</h1>" + lineNo + "<h1>Error column number</h1>" + columnNo + "<h1>Error</h1>" + error + "</div>";
}

function updateDragoncord() {
    console.log("[Updater] Updating");
    makeRequest("POST", "http://127.0.0.1:8723/api/dragoncord/update");
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

function themes_list() {
	makeRequest("GET", "http://127.0.0.1:8723/api/get/themes");
    var themesLineCode = document.getElementById('settings-content').innerHTML = "<h1>Themes</h1>" + warningNotFinished + "<p id='themes-list'>Loading, please wait...</p>";
}

function updater() {
    document.getElementById('settings-content').innerHTML = "<h1>Updater</h1>" + warningNotFinished + "<br>" + restartRequired + "<br>" + "<button onclick='updateDragoncord();'>Update Dragoncord (This requires runned local python server)</button>";
}

function render_error_demo() {
	document.getElementById('settings-content').innerHTML = "<h1>Render settings failed :(</h1><div class='error-message'><img src='./6e97f6643e7df29b26571d96430e92f4.svg' width='100' height='100'> <p class='error-message-text'>Oof.. Something is broken! Render failed. There is information about the error below.</p> </img></div> <div class='settings-error'><h1>Message</h1>" + "Example error" + "<h1>URL</h1>" + "Failed" + "<h1>Error line number</h1>" + "31" + "<h1>Error column number</h1>" + "0" + "<h1>Error</h1>" + "Example error" + "</div>";
}