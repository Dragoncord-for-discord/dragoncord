@echo off
@cd /D %LOCALAPPDATA%\Discord
@cd app-*
@cd resources
@mkdir app
@cd app
@copy "D:\Desktop1\dragoncord\dragoncord\discord-app\main.js" index.js
@copy "D:\Desktop1\dragoncord\dragoncord\discord-app\node-plugins.js" node-plugins.js
@copy "D:\Desktop1\dragoncord\dragoncord\discord-app\package.json" package.json
@mkdir dcord_node_plugins