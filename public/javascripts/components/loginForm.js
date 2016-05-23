function LoginController($scope, $http, $rootScope) {

    this.login = function(user) {
        var email = user.email;
        var password = user.password;

        if (!email || !password) {
            $rootScope.$broadcast("alert:add", {
                msg: "Please fill in all the fields!",
                type: "warning"
            });
        } else {
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

        }

  

    };

};

stickItModule.component('loginFormComponent', {
    templateUrl: "/javascripts/components/loginForm.html",
    controller: LoginController
});
