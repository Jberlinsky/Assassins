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
    // TODO UI element of this.
    getPwChar($rootScope.auth.user.id);
  };

  if ($rootScope.auth && $rootScope.auth.user) {
    navigator.geolocation.watchPosition(function(position) {
      $scope.target = $firebase($rootScope.assassin.child('target'));
      $scope.coords = position.coords;
      $scope.target_pw_cracked = $scope.target.pw_cracked;
      $scope.target_pw_remaining = $scope.target.pw_remaining;
      $scope.i_am_killable = $scope.target.pw_compromised;
      updateLocation($rootScope.auth.user.id, position);
      if (window.app_state === undefined) { window.app_state = 'seeking'; }
      if (window.app_state == 'seeking') {
        // Look for nearby users to decrypt
        findTargetInRange($rootScope.auth.user.id, $scope.target.id, position.coords, function(target) {
          // Start decrypting
          window.app_state = 'decrypting';
          var N_SEC = 2;
          window.setTimeout(decryptOneCharacter, N_SEC * 1000);
        });
      } else if (window.app_state == 'decrypting') {
        // Every N seconds, decrypt one character
        if ($scope.target_pw_remaining == "") {
          window.state = 'broken';
        }
      } else if ($scope.i_am_killable) {
        // Display kill button
        // When the button is clicked, execute kill_user on THAT PHONE's user as the target, and OUR PHONE's user as the user_id
        $('#kill_button').show()
        $('#kill_button').on('click', function(e) {
          // TODO AIDEN killUser
          // TODO show that the user has been killed
        });
      } else if (window.app_state == 'broken') {
        // Go in for the kill
        enableKillBetween($rootScope.auth.user.id, $scope.target.id);
      }
    });
  };
})

.controller('ProfileCtrl', function($scope) {
  $scope.whatever = "cool";
})

.controller('LoginCtrl', function($scope) {
});
