angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
	var captureSuccess = function(stuff) {
		console.log(stuff);
	}

	var captureError = function(err) {
		console.log(err);
	}

	$scope.captureImage = function() {
	    // Launch device camera application, 
	    // allowing user to capture up to 2 images
	    navigator.device.capture.captureImage(captureSuccess, captureError, { limit: 2 });
	}
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
