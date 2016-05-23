function LoginController($scope, $http) {

    this.login = function(user) {
        var email = user.email;
        var password = user.password;

        console.log("Making a request to the server with " + email + " and " + password);

        var stickynotes = $http.get('/api/stickynote');
        stickynotes.then(function(result) {
            console.log(result);
        });
    };

};

stickItModule.component('loginFormComponent', {
    templateUrl: "/javascripts/components/loginForm.html",
    controller: LoginController
});
