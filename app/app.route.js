(function() {

    "use strict";

    var agApp = angular.module('agApp');

    agApp.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
            templateUrl: 'components/main/mainView.html',
            controller: 'MainCtrl as ag'
        })
            .when('/empath-world-map', {
            templateUrl: 'components/empaths/empathWorldMapView.html',
            controller: 'EmpathWorldMapCtrl as em'
        })
            .otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(true);
    });

}());