'use strict';

describe('Controller: AssignCtrl', function () {

  // load the controller's module
  beforeEach(module('notegoatApp'));

  var AssignCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AssignCtrl = $controller('AssignCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
