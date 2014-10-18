(function (angular) {
    'use strict';
    angular.module('learningApp',
            ['ngCookies', 'ngResource', 'ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngTouch']
        ).config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: '/partials/1.html'
                }).when('/second', {
                    templateUrl: '/partials/2.html'
                }).otherwise({
                    redirectTo: '/'
                });
            $locationProvider.html5Mode(true);
        });
})(angular);


