angular.module('assassin.controllers', [])

.controller('AppCtrl', function($scope, $rootScope, $location, $firebaseSimpleLogin) {
	// Firebase
	$rootScope.assassin = new Firebase("https://vivid-fire-2947.firebaseio.com");
	$rootScope.auth = $firebaseSimpleLogin($rootScope.assassin);

	function _login() {
		$location.path('/tab');
	}

	function _logout() {
		$location.path('/tab/target');
	}

	function _error(err) {
		console.log(err);
	}

	$rootScope.$on('$firebaseSimpleLogin:login', _login);
	$rootScope.$on('$firebaseSimpleLogin:logout', _logout);
	$rootScope.$on('$firebaseSimpleLogin:error', _error);
})

.controller('TargetCtrl', function($scope, $firebase, $rootScope) {
	// ------ This binds the "wattup" scope item to an item in firebase --------
	$scope.wattup = $firebase($rootScope.assassin.child("wattup"));
})

.controller('ProfileCtrl', function($scope) {
	$scope.whatever = "cool";
})

.controller('LoginCtrl', function($scope) {
});