#!/bin/bash

echo "Platform: "
read PLATFORM_TO_BUILD

APP_ICON="./dragoncord/discord/images/app.ico"
SOURCE_DIR="."
OUTPUT_DIR="./build"
APP_NAME="Dragoncord"

echo "Dragoncord Build Tool"
echo "Building..."

npx electron-packager $SOURCE_DIR $APP_NAME --platform=$PLATFORM_TO_BUILD --icon=$APP_ICON --out=$OUTPUT_DIR --ignore