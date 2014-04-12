angular.module('assassin.controllers', [])

.controller('AppCtrl', function($scope, $rootScope, $location, $firebaseSimpleLogin) {
  // Firebase
  $rootScope.assassin = new Firebase("https://vivid-fire-2947.firebaseio.com");
  $rootScope.auth = $firebaseSimpleLogin($rootScope.assassin);

  function _login($scope, user) {
    genUser(user.id);
    $location.path('/tab/target');
  }

  function _logout() {
    $location.path('/login');
  }

  function _error(err) {
    console.log(err);
  }

  $rootScope.$on('$firebaseSimpleLogin:login', _login);
  $rootScope.$on('$firebaseSimpleLogin:logout', _logout);
  $rootScope.$on('$firebaseSimpleLogin:error', _error);

  navigator.geolocation.watchPosition(function(position) {
    if ($rootScope.auth && $rootScope.auth.user && $rootScope.auth.user.id) {
      updateLocation($rootScope.auth.user.id, position);
    }
  });
})

.controller('TargetCtrl', function($scope, $firebase, $rootScope) {
  window.setTimeout(scanForBumpableDevices, 10 * 1000);
  navigator.geolocation.watchPosition(function(position) {
    if ($rootScope.auth && $rootScope.auth.user && $rootScope.auth.user.id) {
      updateLocation($rootScope.auth.user.id, position);
    }
  });
  //debugger;
  // ------ This binds the "wattup" scope item to an item in firebase --------
  $scope.target = $firebase($rootScope.assassin.child('target'));
})

.controller('ProfileCtrl', function($scope) {
  $scope.whatever = "cool";
})

.controller('LoginCtrl', function($scope) {
});

function scanForBumpableDevices() {
  // TODO make sure the PW is unlocked
  bluetoothle.initialize(initializeSuccessCallback, initializeErrorCallback);
}
