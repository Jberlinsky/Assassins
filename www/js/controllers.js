angular.module('starter.controllers', [])

.controller('TargetCtrl', function($scope, $firebase) {
	var assassin = new Firebase("https://vivid-fire-2947.firebaseio.com");
	// ------ This binds the "wattup" scope item to an item in firebase --------
	$scope.wattup = $firebase(assassin.child("wattup"));
})

.controller('ProfileCtrl', function($scope) {
});
