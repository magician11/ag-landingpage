var agApp = angular.module('agApp', ['ngAnimate']);

agApp.controller('AgCtrl', function($scope, $timeout) {

    $scope.ag = {
        profilePic: 'http://res.cloudinary.com/go-for-self/image/upload/Andrew-Golightly-profile.jpg',
        profilePicBaby: 'http://res.cloudinary.com/go-for-self/image/upload/c_scale,h_333/c_crop,h_333,w_333/v1430585072/Andrew%20Meditating.jpg',
        showProfilePic: false
    };

    // create a slight delay as a workaround for animation to work on page load
    $timeout(function() {
        $scope.ag.showProfilePic = true;
    },1100);

    $scope.ag.socialNetworks = [
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