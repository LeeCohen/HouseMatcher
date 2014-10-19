'use strict';

/* Services */

var houseMatcherServices = angular.module('houseMatcherServices', []);

houseMatcherServices.factory('SearchOfferedApts', [
  function(){
  	var offeredApts;

  	var setOfferedApts = function(i_offeredApts) {
  		offeredApts = i_offeredApts;
  	}

  	var getOfferedApts = function() {
  		return offeredApts;
  	}

    return {
    	setOfferedApts: setOfferedApts,
    	getOfferedApts: getOfferedApts
    }
  }]);

houseMatcherServices.factory('FormDataObject', function() {
	return function(data) {
		var fd = new FormData();

		angular.forEach(data, function(value, key) {
		fd.append(key, value);
		});

		return fd;
	};
});
