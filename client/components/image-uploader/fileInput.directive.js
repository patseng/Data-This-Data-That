'use strict';

angular.module('notegoatApp')
  .directive('file', ['$parse', function($parse) {
    return {
      restrict: "A",

      // I don't understand the point of this
      scope: {
        file: '@'
      },

      link: function(scope, elem, attrs) {
        elem.bind('change', function(event) {
          var files = event.target.files;

          // only support single file upload
          var file = files[0];

          // sets the file variable in the directive scope
          scope.file = file;

          // the parent scope should be the ImageUploaderCtrl
          scope.$parent.file = file;

          // update the digest cycle
          scope.$apply();
        });

        // eggly version
        // elem.bind('change', function() {
        //   var variable = $parse(attrs.fileInput);
        //   var variableSetter = variable.assign;
        //   variableSetter(scope, elem[0].files);
        //   scope.$apply();
        // });
      }
    }
  }]
);