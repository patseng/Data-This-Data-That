'use strict';

describe('Controller: RegionofinterestCtrl', function () {

  // load the controller's module
  beforeEach(module('notegoatApp'));

  var RegionofinterestCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegionofinterestCtrl = $controller('RegionofinterestCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
