// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'assassin' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'assassin.services' is found in services.js
// 'assassin.controllers' is found in controllers.js
angular.module('assassin', ['ionic', 'assassin.controllers', 'assassin.services', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // Each tab has its own nav history stack:
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    .state('tab.target', {
      url: '/target',
      views: {
        'tab-target': {
          templateUrl: 'templates/target.html',
          controller: 'TargetCtrl'
        }
      }
    })

    .state('tab.profile', {
      url: '/profile',
      views: {
        'tab-profile': {
          templateUrl: 'templates/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/target');

});

