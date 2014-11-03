'use strict';

/* App Module */

var houseMatcherApp = angular.module('houseMatcherApp', [
  'houseMatcherControllers',
  'houseMatcherServices'
]).config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'homeController'
      }).
      when('/recentOfferedApts', {
        templateUrl: 'partials/recentOfferedApts.html',
        controller: 'RecentOfferedAptsController'
      }).
      when('/searchOfferedApts', {
        templateUrl: 'partials/searchOfferedApts.html',
        controller: 'SearchOfferedAptsController'
      }).
      when('/publishNewOfferedApt', {
      	templateUrl: 'partials/publishNewOfferedApt.html',
      	controller: 'PublishNewOfferedAptController'
      }).
      when('/publishNewDesiredApt', {
        templateUrl: 'partials/publishNewDesiredApt.html',
        controller: 'PublishNewDesiredAptController'
      }).
      when('/singleOfferedApt/:offeredAptId', {
        templateUrl: 'partials/singleOfferedApt.html',
        controller: 'SingleOfferedAptController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

  houseMatcherApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);