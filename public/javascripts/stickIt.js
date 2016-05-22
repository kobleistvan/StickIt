var stickItModule = angular.module('stickIt', ['ui.bootstrap', 'angular-packery']);

stickItModule.controller('RegisterController', ['$scope', function($scope) {

    $scope.register = function(user) {
    	console.log(user);
        $scope.master = angular.copy(user);
    };

}]);
