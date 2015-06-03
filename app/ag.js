(function() {

    "use strict";

    var agApp = angular.module('agApp', ['ngAnimate', 'ngEgg']);

    agApp.controller('AgCtrl', function($scope, $timeout, $interval) {

        var vm = this;

        /* the profile image */
        /* ---------------------------- */
        vm.profilePic = 'http://res.cloudinary.com/go-for-self/image/upload/c_scale,h_245/Andrew-Golightly-profile.jpg';
        vm.profilePicBaby = 'http://res.cloudinary.com/go-for-self/image/upload/c_scale,h_245/c_crop,h_245,w_245/v1430585072/Andrew%20Meditating.jpg';

        /* todo add these details in this controller
        vm.agEgg = {
            src: 'planets.html',
            keycode: 'planets'.split('').toString()
        };
        */

        // create a slight delay as a workaround for animation to work on page load
        vm.showProfilePic = false;
        $timeout(function() {
            vm.showProfilePic = true;
        },1100);

        /* ---------------------------- */

        /* the social networks */
        /* ---------------------------- */
        vm.socialNetworks = [
            {icon: 'facebook', link: 'http://facebook.com/andrewgolightly11', name: 'Facebook'}, 
            {icon: 'twitter', link: 'http://twitter.com/AndrewGolightly', name: 'Twitter'},
            {icon: 'google-plus', link: 'https://plus.google.com/+AndrewGolightly/posts', name: 'Google+'},
            {icon: 'github', link: 'https://github.com/magician11/', name: 'GitHub'},
            {icon: 'soundcloud', link: 'https://soundcloud.com/magician11', name: 'SoundCloud'}
        ];
        /* ---------------------------- */

        /* AG's clock */
        /* ---------------------------- */
        vm.agClock = new Date();

        $interval(function() {
            vm.agClock = new Date();
        }, 1000);
    });

    agApp.directive('socialNetwork', function() {

        return {
            templateUrl: 'social-network.html'
        };
    });

}());