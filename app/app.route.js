(function() {

    "use strict";

    var agApp = angular.module('agApp');

    agApp.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
            templateUrl: 'components/main/mainView.html',
            controller: 'MainCtrl as ag'
        })
            .otherwise({
            redirectTo: '/'
        });
    });

}());