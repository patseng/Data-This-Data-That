'use strict';

angular.module('notegoatApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('textlines', {
        url: '/textlines/:sectionId',
        templateUrl: 'app/textlines/textlines.html',
        controller: 'TextlinesCtrl'
      });
  });