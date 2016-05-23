function NavbarController($scope, $http, $state, $rootScope) {
	$scope.welcomeMessage;

	this.getAccountDetails = function() {
        $http.get('/api/account/').then(function(result) {
            if (result.data.success) {
            	$scope.welcomeMessage = " — Welcome, " + result.data.accountDetails.firstName + "!";

            } else {
                return $rootScope.$broadcast("alert:add", {
                    msg: result.err,
                    type: "danger"
                });
            }
        });
	};

    this.logout = function() {
        $http.get('/api/authentication/logout').then(function(result) {
            if (result.data.success) {
                $state.go('authentication');
            } else {
                return $rootScope.$broadcast("alert:add", {
                    msg: result.err,
                    type: "danger"
                });
            }
        });
    };

	this.getAccountDetails();

};

stickIt.component('navbarComponent', {
    templateUrl: "/javascripts/components/navbar.html",
    controller: NavbarController
});
