var stickItComponent = angular.module('stickIt', ['ui.bootstrap', 'angular-packery', 'ngResource', 'ui.router']);

stickItComponent.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/authentication');

    $stateProvider.state('authentication', {
        url: '/authentication',
        templateUrl: '/javascripts/components/authentication.html'
    }).state('dashboard', {
        url: '/dashboard',
        templateUrl: '/javascripts/components/dashboard.html'
    })

});
