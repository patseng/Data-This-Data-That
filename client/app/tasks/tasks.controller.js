'use strict';

angular.module('notegoatApp')
  .controller('TasksCtrl', function ($scope, $http, Auth) {

    $scope.tasks = {}

    $scope.currentUser = Auth.getCurrentUser();

    var numCompletedTasks = 0;
    var numTotalTasks = 0;
    var url = '/api/tasks?assignedTo_id=' + $scope.currentUser._id;
  	$http.get(url).success(function(data, status, headers, config) {
      console.log(data);
      numTotalTasks = data.length;
      for (var i = 0; i < data.length; i++) {
        var task = data[i];
        var taskType = task.task_type;
        console.log(taskType);
        if (!$scope.tasks[taskType]) {
          $scope.tasks[taskType] = [task];
        }
        else {
          $scope.tasks[taskType].push(task);
        }

        if (task.isCompleted) {
          numCompletedTasks += 1;
        }
      }
      if (numTotalTasks == 0) $scope.percentCompleted = 0;
      else $scope.percentCompleted = 1.0 * numCompletedTasks / numTotalTasks;

      console.log($scope.tasks);

    });

  	$scope.taskNames = ['Region of Interest', 'Sections', 'Textlines'];
    $scope.taskTypes = ['regionOfInterest', 'section', 'textline'];
    $scope.currTaskType = $scope.taskTypes[0];
    $scope.currentSelectedItem = $scope.taskNames[0];

    $scope.updateTable = function(index) {
      console.log('Table updated at index ' + index);

      $scope.currTaskType = $scope.taskTypes[index];
      $scope.currentSelectedItem = $scope.taskNames[index];
      
    }
  });


