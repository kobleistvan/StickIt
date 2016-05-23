function NavbarController($scope, $http, $state) {

    this.openSettings = function() {
        console.log('Opening settings modal');
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

};

stickItComponent.component('navbarComponent', {
    templateUrl: "/javascripts/components/navbar.html",
    controller: NavbarController
});
