clean:
	rm -rf platforms/*
	rm -rf plugins/*

plugins:
	cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-device-motion.git
	cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-device-orientation.git
	cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-geolocation.git
	cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-dialogs.git
	cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-vibration.git
	cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-inappbrowser.git

platforms: clean
	cordova platform add ios
	cordova platform add android

build: platforms
	cordova build

emulate_ios: platforms
	cordova emulate ios

emaulate_android: platforms
	cordova emulate android
