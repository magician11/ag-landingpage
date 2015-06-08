(function() {

    "use strict";

    var agApp = angular.module('agApp');

    agApp.controller('FooterCtrl', function() {
        
        var vm = this;
        
        /* the social networks */
        /* ---------------------------- */
        vm.socialNetworks = [
            {icon: 'facebook', link: 'http://facebook.com/andrewgolightly11', name: 'Facebook'}, 
            {icon: 'twitter', link: 'http://twitter.com/AndrewGolightly', name: 'Twitter'},
            {icon: 'google-plus', link: 'https://plus.google.com/+AndrewGolightly/posts', name: 'Google+'},
            {icon: 'github', link: 'https://github.com/magician11/', name: 'GitHub'},
            {icon: 'instagram', link: 'https://instagram.com/magician11/', name: 'Instagram'},
            {icon: 'linkedin', link: 'https://www.linkedin.com/in/andrewgolightly11', name: 'LinkedIn'},
            {icon: 'soundcloud', link: 'https://soundcloud.com/magician11', name: 'SoundCloud'}
        ];
        /* ---------------------------- */

    });

}());