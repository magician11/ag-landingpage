var agApp = angular.module('agApp', ['ngAnimate']);

agApp.controller('AgCtrl', function($scope, $timeout) {

    // set profile pic to be hidden on page load, then animate in
    $scope.ag = {
        showProfilePic: false
    };

    // create a slight delay as a workaround for animation to work on page load
    $timeout(function() {
        $scope.ag.showProfilePic = true;
    },800);

    $scope.agSocialNetworks = [
        {icon: 'facebook', link: 'http://facebook.com/andrewgolightly11'}, 
        {icon: 'twitter', link: 'http://twitter.com/AndrewGolightly'},
        {icon: 'google-plus', link: 'https://plus.google.com/+AndrewGolightly/posts'},
        {icon: 'github', link: 'https://github.com/magician11/'}
    ];
});

agApp.directive('socialNetwork', function() {

    return {
        templateUrl: 'social-network.html'
    };
});