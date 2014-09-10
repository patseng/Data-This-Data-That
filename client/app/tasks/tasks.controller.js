'use strict';

angular.module('notegoatApp')
  .controller('TasksCtrl', function ($scope) {

  	
  	$scope.todos = ['Pages', 'Sections', 'Text Lines', 'Words', 'Characters'];

    $scope.currentSelectedItem = 'Pages';

    $scope.Pages = ['Page1', 'Page2', 'Page3', 'Page4', 'Page5', 'page6', 'page7', 'page8', 'page9'];
    $scope.Sections = ['Section1', 'Section2', 'Section3', 'Section4', 'Section5'];
    $scope.TextLines = ['Line1', 'Line2', 'Line3', 'Line4', 'Line5', 'Line7', 'Line8', 'line9'];
    $scope.Words = ['Word1', 'Word2', 'Word3', 'Word4', 'Word5'];

    $scope.TableArray = $scope.Pages;

    $scope.Completed = ['Yes', 'No', 'No', 'Yes'];


    $scope.updateTable = function(index) {
      console.log('Table updated at index ' + index);

      if (index == 0) {
        $scope.TableArray = $scope.Pages;
        $scope.currentSelectedItem = "Pages";
      } else if (index == 1) {
        $scope.TableArray = $scope.Sections;
        $scope.currentSelectedItem = "Sections";
      } else if (index == 2) {
        $scope.TableArray = $scope.TextLines;
        $scope.currentSelectedItem = "Text Lines";
      } else if (index == 3) {
        $scope.TableArray = $scope.Words;
        $scope.currentSelectedItem = "Words";
      } 
    }

    $scope.message = 'Hello';
  });


