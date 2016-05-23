var stickItComponent = angular.module('stickIt', ['ui.bootstrap', 'angular-packery', 'ngResource', 'ui.router']);

var initializeApp = function($http, $state) {

    // Check if the user has a valid token and if he's logged in or not
    $http.get('/api/authentication/loggedin').then(function(result) {
        if (result.data.success) {
            $state.go('dashboard');
        } else {
            $state.go('authentication');
        }
    });

};

// Define route states and templates to render
stickItComponent.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('authentication', {
        templateUrl: '/javascripts/components/authentication.html'
    }).state('dashboard', {
        templateUrl: '/javascripts/components/dashboard.html'
    })

});

stickItComponent.run(initializeApp);
