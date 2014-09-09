'use strict';

angular.module('notegoatApp')
  .controller('AssignCtrl', function ($scope, $http) {
  	$http.get('/api/users/').success(function(data, status, headers, config) {
  		console.log(data);
  	});

    $scope.message = 'Hello';
  });
