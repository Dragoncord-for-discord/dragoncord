function about() {
    document.getElementById('settings-content').innerHTML = "<h1>About</h1><p>Build 30.04.2022</p><p id='user-agent'>Your user-agent in console</p><p>Repository: <a href='https://github.com/Dragoncord-for-discord/dragoncord'>https://github.com/Dragoncord-for-discord/dragoncord</a></p>";
    console.log(navigator.userAgent);
}

function settings() {
	var settingsString = "<h1>Settings</h1><input type='checkbox' id='invisible_typing'><label for='invisible_typing'>Invisible typing</label> <p></p> <input type='checkbox' id='block_telemetry'><label for='block_telemetry'>Block telemetry (/science)</label>"
    document.getElementById('settings-content').innerHTML = settingsString;
}

function plugins_list() {
    document.getElementById('settings-content').innerHTML = "<h1>Plugins</h1><p id='plugins-list'>Loading</p>";
}

function themes_list() {
    document.getElementById('settings-content').innerHTML = "<h1>Themes</h1><p id='themes-list'>Loading</p>";
}