'use strict';

var app = angular.module('notegoatApp');

app.controller('AssignCtrl', function ($scope, $http) {
  	$http.get('/api/users/?role=annotator').success(function(data, status, headers, config) {
  		$scope.annotators = data;
  	});

    $scope.taskNames = ['regionOfInterest', 'section', 'textline'];
    $scope.taskType = $scope.taskNames[0];
    $scope.numTasksToAssign = 1;

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

    $scope.makeAssignment = function () {
    	var rootUrl = "/api/tasks/makeAssignments";
    	var assignedToParam = "assignedTo_id=" + $scope.assignedTo._id;
    	var numAssignmentsParam = "numAssignments=" + $scope.numTasksToAssign;
      var taskTypeParam = "taskType=" + $scope.taskType;
    	var params = "?" + assignedToParam + "&" + numAssignmentsParam + "&" + taskTypeParam;
    	var postUrl = rootUrl + params;

    	console.log(postUrl);

    	$http.post(postUrl).success(function(data, status, headers, config) {
  			console.log("done posting...");
  		});
    }

  });

app.filter('performSearch', function() {
	return function(annotators, searchString){
		if(!searchString){
			return [];
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
