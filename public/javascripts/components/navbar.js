function NavbarController($scope, $http, $state, $rootScope) {

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

};

stickIt.component('navbarComponent', {
    templateUrl: "/javascripts/components/navbar.html",
    controller: NavbarController
});
