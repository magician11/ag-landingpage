(function() {

    "use strict";

    var agApp = angular.module('agApp', ['ngAnimate']);

    agApp.controller('AgCtrl', function($scope, $timeout) {

        var vm = this;

        vm.profilePic = 'http://res.cloudinary.com/go-for-self/image/upload/Andrew-Golightly-profile.jpg';
        vm.profilePicBaby = 'http://res.cloudinary.com/go-for-self/image/upload/c_scale,h_333/c_crop,h_333,w_333/v1430585072/Andrew%20Meditating.jpg';
        vm.showProfilePic = false;

        // create a slight delay as a workaround for animation to work on page load
        $timeout(function() {
            vm.showProfilePic = true;
        },1100);

        vm.socialNetworks = [
            {icon: 'facebook', link: 'http://facebook.com/andrewgolightly11', name: 'Facebook'}, 
            {icon: 'twitter', link: 'http://twitter.com/AndrewGolightly', name: 'Twitter'},
            {icon: 'google-plus', link: 'https://plus.google.com/+AndrewGolightly/posts', name: 'Google+'},
            {icon: 'github', link: 'https://github.com/magician11/', name: 'GitHub'},
            {icon: 'soundcloud', link: 'https://soundcloud.com/magician11', name: 'SoundCloud'}
        ];
    });

    agApp.directive('socialNetwork', function() {

        return {
            templateUrl: 'social-network.html'
        };
    });
}());