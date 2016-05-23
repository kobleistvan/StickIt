function LoginController($scope, $http, $rootScope) {

    this.login = function(user) {
        var email = user.email;
        var password = user.password;

        // Validate fields
        if (!email || !password) {
            return $rootScope.$broadcast("alert:add", {
                msg: "Please fill in all the fields!",
                type: "warning"
            });
        }

        // Log the user in
        $http.post('/api/authentication/login', {
            email: email,
            password: password
        }).then(function(result) {
            if (result.data.success){
                $rootScope.$broadcast("alert:add", {
                    msg: "Welcome back!",
                    type: "success"
                });

            } else {
                $rootScope.$broadcast("alert:add", {
                    msg: result.data.message,
                    type: "danger"
                });
            }

        });

    };

};

stickItModule.component('loginFormComponent', {
    templateUrl: "/javascripts/components/loginForm.html",
    controller: LoginController
});
