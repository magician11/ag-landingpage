(function() {

    "use strict";

    var agApp = angular.module('agApp');

    agApp.controller('MainCtrl', function($interval, AGsInstagram) {
        
        var vm = this;

        /* AG's clock */
        /* ---------------------------- */
        vm.agClock = new Date();

        $interval(function() {
            vm.agClock = new Date();
        }, 1000);
        /* ---------------------------- */

        /* Get the Instagram pics */
        /* ---------------------------- */
        AGsInstagram.getLatest(function(data) {
            vm.instagramMedia = data;
        });
    });

}());