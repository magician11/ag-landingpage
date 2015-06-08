(function() {

    "use strict";

    var agApp = angular.module('agApp');

    agApp.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
            templateUrl: 'components/main/mainView.html',
            controller: 'MainCtrl as ag'
        })
            .otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(true);
    });

}());