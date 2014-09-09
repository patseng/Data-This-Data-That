'use strict';

var app = angular.module('notegoatApp');

app.controller('AssignCtrl', function ($scope, $http) {
  	$http.get('/api/users/?role=annotator').success(function(data, status, headers, config) {
  		$scope.annotators = data;
  	});

    $scope.message = 'Hello';

    $scope.setAssignedTo = function(annotator_idx) {
    	console.log("did assign to");
    	console.log("Setting assignedTo to " + $scope.annotators[annotator_idx]);
    	$scope.assignedTo = $scope.annotators[annotator_idx];
    	$scope.currString = $scope.assignedTo.email;
    }

    $scope.resetAssignedTo = function() {
    	console.log("Setting assignedTo to undefined...");
    	$scope.assignedTo = undefined;
    }

  });

app.filter('performSearch', function() {
	return function(annotators, searchString){

		if(!searchString){
			return annotators;
		}

		var result = [];
		searchString = searchString.toLowerCase();
		angular.forEach(annotators, function(user){
			if(user.email.toLowerCase().indexOf(searchString) !== -1){
				result.push(user);
			}
		});
		return result;
	};
});
