'use strict';

/* Controllers */

var houseMatcherControllers = angular.module('houseMatcherControllers',[]);
  
houseMatcherControllers.controller('RecentOfferedAptsController', ['$scope', '$http',
	function($scope, $http) {
		var recentOfferedAptsUrl = "http://localhost:3000/getRecentOfferedApts";

	    $http.get(recentOfferedAptsUrl).success(function(data) {
	      $scope.recentOfferedApts = data;
	    });
	}
]);

houseMatcherControllers.controller('SearchOfferedAptsController', ['$scope', '$http', 'FormDataObject',
	function($scope, $http, FormDataObject) {
		$scope.processForm = function() {
				// $http({
			 //        method  : 'POST',
			 //        url     : 'http://proc.node.com',
			 //        data   : {data: $.param($scope.formData)},
			 //        headers: {
				// 	'Content-Type': 'multipart/form-data'
				// 	},
				// 	transformRequest: FormDataObject
			 //    })
		$http.post('/http://proc.node.com', {data : $.param($scope.formData)})
		        .success(function(data) {
		            alert(data);
			});
		}
	}
]);


// // Simple POST request example (passing data) :
// $http.post('/someUrl', {msg:'hello word!'}).
//   success(function(data, status, headers, config) {
//     // this callback will be called asynchronously
//     // when the response is available
//   }).
//   error(function(data, status, headers, config) {
//     // called asynchronously if an error occurs
//     // or server returns response with an error status.
//   });

//   https://docs.angularjs.org/api/ng/service/$http