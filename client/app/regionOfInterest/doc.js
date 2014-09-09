angular.module('notegoatApp')
  .provider('Doc', function() {
    this.$get = ['$resource', function($resource) {
      var Doc = $resource('/api/docs/:_id');
      return Doc;
    }];
  });