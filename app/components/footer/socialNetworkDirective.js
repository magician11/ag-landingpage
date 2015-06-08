(function() {

    "use strict";

    var agApp = angular.module('agApp');

    agApp.directive('socialNetwork', function() {

        return {
            templateUrl: 'components/footer/socialNetworkView.html'
        };
    });
})();