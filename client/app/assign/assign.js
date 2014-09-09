'use strict';

angular.module('notegoatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('assign', {
        url: '/assign',
        templateUrl: 'app/assign/assign.html',
        controller: 'AssignCtrl'
      });
  });