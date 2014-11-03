'use strict';

/* Services */

var houseMatcherServices = angular.module('houseMatcherServices', []);

houseMatcherServices.factory('FormUpload', ['$http', function ($http) {
    var sendForm = function(formData, uploadUrl, successFunc, errorFunc){
        // formData.append('Pictures', file);
        $http.post(uploadUrl, formData, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(successFunc)
        .error(errorFunc);
    }

    return {
      sendForm: sendForm
    }

}]);