angular.module('assassin.controllers', [])

.controller('AppCtrl', function($scope, $rootScope, $location, $firebaseSimpleLogin) {
  // Firebase
  $rootScope.assassin = new Firebase("http://vivid-fire-2947.firebaseio.com");
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
})

.controller('TargetCtrl', function($scope, $firebase, $rootScope) {
  decryptOneCharacter = function() {
    getPwChar($rootScope.auth.user.id);
  };

  if ($rootScope.auth && $rootScope.auth.user) {
    navigator.geolocation.watchPosition(function(position) {
      $scope.target = $firebase($rootScope.assassin.child('target'));
      $scope.coords = position.coords;
      console.log($scope.target);
      console.log(position);
    $scope.target_pw_cracked = $scope.target.pw_cracked;
    $scope.target_pw_remaining = $scope.target.pw_remaining;
      updateLocation($rootScope.auth.user.id, position);
      if (window.app_state === undefined) { window.app_state = 'seeking'; }
      if (window.app_state == 'seeking') {
        // Look for nearby users to decrypt
        //debugger;
        findUserInRange($rootScope.auth.user.id, function(target) {
          if (target.id == $scope.target.id) {
            // Start decrypting
            window.app_state = 'decrypting';
            var N_SEC = 2;
            window.setTimeout(decryptOneCharacter, N_SEC * 1000);
          }
        });
      } else if (window.app_state == 'decrypting') {
        // Every N seconds, decrypt one character
        if ($scope.target_pw_remaining == "") {
          window.state = 'broken';
        }
      } else if (window.app_state == 'broken') {
        // Go in for the kill
        cordova.plugins.barcodeScanner.scan(function (result) {
          var scanned_result = result.text;
          if (scanned_result == $scope.target.id) {
            // We just killed our target
            killUser($scope.target.id, $rootScope.auth.user.id);
            alert("You have killed " + $scope.target.name + "!");
          }
        },
        function (error) {
            alert("Scanning failed: " + error);
        });
      }
    });
  };
})

.controller('ProfileCtrl', function($scope) {
  $scope.whatever = "cool";
})

.controller('LoginCtrl', function($scope) {
});
