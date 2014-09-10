'use strict';

angular.module('notegoatApp')
  .controller('RegionofinterestCtrl', function ($scope, $http, Auth, $state, Doc) {
		$scope.doc = new Doc.get({_id: $state.params.docId}, function(value, headers) {
      // get rid of this later
      $scope.noImage = value.image_url === undefined;
    });

		// var Doc = $resource('/api/docs/:_id');
		// $scope.doc = new Doc();
	  // var user = User.get({id:123}, function() {
	  //   user.abc = true;
	  //   user.$save();
	  // });

    $scope.save = function() {
	  // 	$http.get('/api/docs/1').success(function(el){
   //  		console.log(response);
			// }).error(function(err,status){
   //  		console.log("Err",err,status);
			// });
			if ($scope.doc._id) {
        Doc.update({_id: $scope.doc._id}, $scope.doc);
      } else {
        $scope.doc.$save();
      }
      $scope.doc = new Doc();
    };

  });
