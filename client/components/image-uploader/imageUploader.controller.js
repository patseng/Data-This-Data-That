'use strict';

angular.module('notegoatApp')
  .controller('ImageUploaderCtrl', ['$scope', '$http', function ($scope, $http) {

      $scope.filesChanged = function(elem) {
        $scope.files = elem.files;
        $scope.$apply();
      };

      $scope.upload = function() {
        var fd = new FormData();
        angular.forEach($scope.files, function(file) {
          fd.append('file', file);
        });
        $http.post('/api/docs', fd,
        {
          transformRequest: angular.identity,
          headers: {'Content-Type' : undefined }
        }).success(function(d) {
            console.log(d);
          });
      }
    }]
);