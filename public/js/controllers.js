'use strict';

/* Controllers */

var houseMatcherControllers = angular.module('houseMatcherControllers',[]);
  
houseMatcherControllers.controller('homeController', [function() {}]);

houseMatcherControllers.controller('RecentOfferedAptsController', ['$scope', '$http',
	function($scope, $http) {
		var recentOfferedAptsUrl = "http://localhost:3000/getRecentOfferedApts";

	    $http.get(recentOfferedAptsUrl).success(function(data) {
	      $scope.recentOfferedApts = data;
	    });
	}
]);

houseMatcherControllers.controller('SearchOfferedAptsController', ['$scope', '$http', 'FormUpload',
	function($scope, $http, FormUpload) {
		$scope.searchResults = [];
		$scope.searchOfferedApts = function() {
			var fd = new FormData();
			var uploadUrl = "http://localhost:3000/searchOfferedApts";

			fillFormDataForSearchOfferedApts(fd, $scope);

			var successFunction = function(data) {
				console.log('success');
	            $scope.searchResults = data;
			}

			var errorFunction = function() {
				console.log('error');
			}

			FormUpload.sendForm(fd, uploadUrl, successFunction, errorFunction);
		}
	}
]);

houseMatcherControllers.controller('PublishNewOfferedAptController', ['$scope', '$http', 'FormUpload',
	function($scope, $http, FormUpload) {
		$scope.publishSuccess = false;
		$scope.publishError = false;
		$scope.publishNewOfferedApt = function() {
			var file = $scope.myFile;

			var fd = new FormData();
			var uploadUrl = "http://localhost:3000/offeredApts";

			fillFormDataForPublishNewOfferedApt(fd, $scope);
			fd.append('Pictures', file);

			var successFunction = function(data){
	            console.log('success');
	            console.log(data);
	            $scope.publishSuccess = true;
	            $scope.publishError = false;
	        }

	        var errorFunction = function(){
	            console.log('error');
	            $scope.publishError = true;
	            $scope.publishSuccess = false;

	        }

	        FormUpload.sendForm(fd, uploadUrl, successFunction, errorFunction);
		}
	}
]);

houseMatcherControllers.controller('PublishNewDesiredAptController', ['$scope', '$http', 'FormUpload', 
	function($scope, $http, FormUpload) {
		$scope.publishSuccess = false;
		$scope.publishError = false;
		$scope.publishNewDesiredApt = function() {
			var fd = new FormData();
			var uploadUrl = "http://localhost:3000/desiredApts";

			fillFormDataForPublishNewDesiredApt(fd, $scope);

			var successFunction = function(data){
	            console.log('success');
	            console.log(data);
	            $scope.publishSuccess = true;
	            $scope.publishError = false;
	        }

	        var errorFunction = function(){
	            console.log('error');
	            $scope.publishError = true;
	            $scope.publishSuccess = false;

	        }

	        FormUpload.sendForm(fd, uploadUrl, successFunction, errorFunction);
		}
	}
]);

houseMatcherControllers.controller('SingleOfferedAptController', ['$scope', '$routeParams', '$http',
	function($scope, $routeParams, $http) {
		$scope.offeredApt = {};
		var offeredAptId = $routeParams.offeredAptId;
		var getSingleOfferedAptUrl = "http://localhost:3000/offeredApts/" + offeredAptId;

		$http.get(getSingleOfferedAptUrl).success(function(data) {
			$scope.offeredApt = data;
	      // for(var key in data.Location) {
	      // 	$scope.offeredApt[key] = data.Location[key];
	      // }

	      // for(var key in data.Properties) {
	      // 	$scope.offeredApt[key] = data.Properties[key];
	      // }

	      // for(var key in data.Utilities) {
	      // 	$scope.offeredApt[key] = '';
	      // }	
	    });

	}
]);

function fillFormDataForPublishNewOfferedApt(fd, $scope) {
	if(! $scope.myFormData) {
		return false;
	}

	if($scope.myFormData.Location) {
		if($scope.myFormData.Location.City) {
			fd.append('Location.City', $scope.myFormData.Location.City);
		}
		
		if($scope.myFormData.Location.Neighborhood) {
			fd.append('Location.Neighborhood', $scope.myFormData.Location.Neighborhood);
		}

		if($scope.myFormData.Location.Street) {
			fd.append('Location.Street', $scope.myFormData.Location.Street);
		}
		
		if($scope.myFormData.Location.HouseNumber) {
			fd.append('Location.HouseNumber', $scope.myFormData.Location.HouseNumber);
		}
	}

	if($scope.myFormData.Properties) {
		if($scope.myFormData.Properties.Price) {
			fd.append('Properties.Price', $scope.myFormData.Properties.Price);
		}
	
		if($scope.myFormData.Properties.Size) {
			fd.append('Properties.Size', $scope.myFormData.Properties.Size);
		}
		
		if($scope.myFormData.Properties.Rooms) {
			fd.append('Properties.Rooms', $scope.myFormData.Properties.Rooms);
		}
		
		if( $scope.myFormData.Properties.Floor) {
			fd.append('Properties.Floor', $scope.myFormData.Properties.Floor);
		}
	}

	if($scope.myFormData.Utilities) {
		if($scope.myFormData.Utilities.Parking) {
			fd.append('Utilities.Parking', $scope.myFormData.Utilities.Parking);
		}

		if($scope.myFormData.Utilities.Elavator) {
			fd.append('Utilities.Elavator', $scope.myFormData.Utilities.Elavator);
		}

		if($scope.myFormData.Utilities.SafeRoom) {
			fd.append('Utilities.SafeRoom', $scope.myFormData.Utilities.SafeRoom);
		}

		if($scope.myFormData.Utilities.WindowsBars) {
			fd.append('Utilities.WindowsBars', $scope.myFormData.Utilities.WindowsBars);
		}
		
		if($scope.myFormData.Utilities.Furniture) {
			fd.append('Utilities.Furniture', $scope.myFormData.Utilities.Furniture);
		}
		
		if($scope.myFormData.Utilities.AirConditioning) {
			fd.append('Utilities.AirConditioning', $scope.myFormData.Utilities.AirConditioning);
		}

		if($scope.myFormData.Utilities.SunBoiler) {
			fd.append('Utilities.SunBoiler', $scope.myFormData.Utilities.SunBoiler);
		}
	}
}

function fillFormDataForPublishNewDesiredApt(fd, $scope) {
	fillFormDataForSearchOfferedApts(fd, $scope);
}

function fillFormDataForSearchOfferedApts(fd, $scope) {
	if(! $scope.myFormData) {
		return false;
	}

	if($scope.myFormData.Location) {
		if($scope.myFormData.Location.City) {
			fd.append('Location.City', $scope.myFormData.Location.City);
		}
		
		if($scope.myFormData.Location.Neighborhood) {
			fd.append('Location.Neighborhood', $scope.myFormData.Location.Neighborhood);
		}

		if($scope.myFormData.Location.Street) {
			fd.append('Location.Street', $scope.myFormData.Location.Street);
		}
		
		if($scope.myFormData.Location.From_HouseNumber) {
			fd.append('Location.From_HouseNumber', $scope.myFormData.Location.From_HouseNumber);
		}
		
		if($scope.myFormData.Location.To_HouseNumber) {
			fd.append('Location.To_HouseNumber', $scope.myFormData.Location.To_HouseNumber);
		}
	}

	if($scope.myFormData.Properties) {
		if($scope.myFormData.Properties.Max_Price) {
			fd.append('Properties.Max_Price', $scope.myFormData.Properties.Max_Price);
		}
	
		if($scope.myFormData.Properties.Size) {
			fd.append('Properties.Size', $scope.myFormData.Properties.Size);
		}
		
		if($scope.myFormData.Properties.Min_Rooms) {
			fd.append('Properties.Min_Rooms', $scope.myFormData.Properties.Min_Rooms);
		}

		if($scope.myFormData.Properties.Max_Rooms) {
			fd.append('Properties.Max_Rooms', $scope.myFormData.Properties.Max_Rooms);
		}
		
		if( $scope.myFormData.Properties.Min_Floor) {
			fd.append('Properties.Min_Floor', $scope.myFormData.Properties.Min_Floor);
		}
		
		if($scope.myFormData.Properties.Max_Floor) {
			fd.append('Properties.Max_Floor', $scope.myFormData.Properties.Max_Floor);
		}
	}

	if($scope.myFormData.Utilities) {
		if($scope.myFormData.Utilities.Parking) {
			fd.append('Utilities.Parking', $scope.myFormData.Utilities.Parking);
		}

		if($scope.myFormData.Utilities.Elavator) {
			fd.append('Utilities.Elavator', $scope.myFormData.Utilities.Elavator);
		}

		if($scope.myFormData.Utilities.SafeRoom) {
			fd.append('Utilities.SafeRoom', $scope.myFormData.Utilities.SafeRoom);
		}

		if($scope.myFormData.Utilities.WindowsBars) {
			fd.append('Utilities.WindowsBars', $scope.myFormData.Utilities.WindowsBars);
		}
		
		if($scope.myFormData.Utilities.Furniture) {
			fd.append('Utilities.Furniture', $scope.myFormData.Utilities.Furniture);
		}
		
		if($scope.myFormData.Utilities.AirConditioning) {
			fd.append('Utilities.AirConditioning', $scope.myFormData.Utilities.AirConditioning);
		}

		if($scope.myFormData.Utilities.SunBoiler) {
			fd.append('Utilities.SunBoiler', $scope.myFormData.Utilities.SunBoiler);
		}
	}
}