angular.module('HouseMatcher', ["ngRoute", "mobile-angular-ui"])
        .config(function($routeProvider) {
  $routeProvider.when('/',          {templateUrl: "templates/feed.html"});
  $routeProvider.when('/Search',    {templateUrl: "templates/search.html"}); 
  $routeProvider.when('/Publish',    {templateUrl: "templates/publish.html"}); 
//        .config(function ($routeProvider) {
//            $routeProvider
//                    .when('/', {
//                        templateUrl: 'templates/feed.html'
////                        controller: 'FeedCtrl'
//                    })
//                    .when('/Search', {
//                        templateUrl: 'templates/search.html'
////                        controller: 'SearchCtrl'
//                    })
//                    .when('/Publish', {
//                        templateUrl: 'templates/publish.html'
////                        controller: 'PublishCtrl'
//                    })
//                    .otherwise({
//                        redirectTo: '/'
//                    });
//        });
  });
