'use strict';

angular.module('notegoatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('sections', {
        url: '/sections/:docId',
        templateUrl: 'app/sections/sections.html',
        controller: 'SectionsCtrl'
      });
  });