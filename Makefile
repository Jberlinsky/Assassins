clean:
	rm -rf platforms/*
	rm -rf plugins/*

platforms: clean
	cordova platform add ios
	cordova platform add android

build: platforms
	cordova build

emulate_ios: platforms
	cordova emulate ios

emaulate_android: platforms
	cordova emulate android
