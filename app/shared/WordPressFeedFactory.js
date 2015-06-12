(function() {

    "use strict";

    var agApp = angular.module('agApp');

    agApp.factory('WordPressFeed', function($http) {

        function getLatestPosts(wpWebsite, numPosts, callback) {

            var feedUrl = wpWebsite + '/feed/';

            $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load', {
                params: {
                    v: '1.0', q: feedUrl, callback:'JSON_CALLBACK', num: numPosts
                }
            })
                .success(function(response) {
                callback(response.responseData.feed.entries);
            });
        }

        return {
            getLatestPosts: getLatestPosts
        };

    });

})();