'use strict';

angular.module('notegoatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('regionOfInterest', {
        url: '/regionOfInterest/:docId',
        templateUrl: 'app/regionOfInterest/regionOfInterest.html',
        controller: 'RegionofinterestCtrl'
      });
  });