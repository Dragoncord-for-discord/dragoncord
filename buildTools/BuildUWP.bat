@echo off
cd ..

set APP_ICON=./dragoncord/discord/images/app.ico
set SOURCE_DIR=.
set OUTPUT_DIR=./build
set APP_NAME=Dragoncord
set APP_VERSION=1.0.0

echo.
echo Dragoncord Build Tool
echo Building...
echo.
electron-windows-store --input-directory %SOURCE_DIR% --output-directory %OUTPUT_DIR% --package-version %APP_VERSION% --package-name %APP_NAME%