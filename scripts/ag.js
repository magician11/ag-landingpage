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

var egg = new Egg('babyandrew'.split('').toString(), function() {

    $('.jumbotron img').fadeTo(2200, 0, function() {
        setTimeout(function() {
            $('.jumbotron img').attr("src","http://res.cloudinary.com/go-for-self/image/upload/c_scale,h_333/c_crop,h_333,w_333/v1430585072/Andrew%20Meditating.jpg");
        },100);

    }).delay(1100).fadeTo(1100, 1);

}).listen();