function RegisterController($scope, $http, $rootScope) {

    this.register = function(user) {
        var email = user.email;
        var firstName = user.firstName;
        var lastName = user.lastName;
        var password = user.password;
        var confirmPassword = user.confirmPassword;

        // Validate fields
        if (!email || !password || !firstName || !lastName || !confirmPassword) {
            return $rootScope.$broadcast("alert:add", {
                msg: "Please fill in all the fields!",
                type: "warning"
            });
        }

        if (password !== confirmPassword) {
            return $rootScope.$broadcast("alert:add", {
                msg: "You did not confirm your password correctly!",
                type: "warning"
            });
        }

        $http.post('/api/authentication/register', {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        }).then(function(result) {
            if (result.data.success) {
                $rootScope.$broadcast("alert:add", {
                    msg: "Welcome! Now please login.",
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

stickItComponent.component('registerFormComponent', {
    templateUrl: "/javascripts/components/registerForm.html",
    controller: RegisterController
});
