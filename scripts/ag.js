var agApp = angular.module('agApp', []);

agApp.controller('AgCtrl', function($scope) {

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