'use strict';

describe('Controller: TextlinesCtrl', function () {

  // load the controller's module
  beforeEach(module('notegoatApp'));

  var TextlinesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TextlinesCtrl = $controller('TextlinesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
