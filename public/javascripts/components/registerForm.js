function RegisterController($scope, $http) {

    this.register = function(user) {
        var email = user.email;
        var firstName = user.firstName;
        var lastName = user.lastName;
        var password = user.password;
        var confirmPassword = user.confirmPassword;

        console.log("Making a request to the server with " + email + " and " + password + " and the rest...");
    };
};

stickItModule.component('registerFormComponent', {
    templateUrl: "/javascripts/components/registerForm.html",
    controller: RegisterController
});
