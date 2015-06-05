(function() {

    "use strict";

    var agApp = angular.module('agApp');

    agApp.factory('AGsInstagram', function($http) {

        function getLatest(callback) {

            var endPoint = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=540289959.29f38f4.3734ac00bcc349919709143960579038&callback=JSON_CALLBACK&count=3';

            $http.jsonp(endPoint).success(function(response) {
                callback(response.data);
            });
        }

        return {
            getLatest: getLatest
        };

    });

})();