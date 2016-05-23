stickIt.controller('SettingsModalController', function($scope, $uibModal) {

    $scope.openSettings = function() {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/javascripts/components/settingsModal.html',
            controller: 'SettingsModalControllerInstance'
        });

        modalInstance.result.then(function() {});
    };

});

stickIt.controller('SettingsModalControllerInstance', function($scope, $rootScope, $uibModalInstance, $http, $state) {

    $scope.user = {};

	this.getAccountDetails = function() {
        $http.get('/api/account/').then(function(result) {
            if (result.data.success) {
            	$scope.user.firstName = result.data.accountDetails.firstName;
            	$scope.user.lastName = result.data.accountDetails.lastName;
            } else {
                return $rootScope.$broadcast("alert:add", {
                    msg: result.err,
                    type: "danger"
                });
            }
        });
	};

	this.getAccountDetails();

    $scope.updateDetails = function(user) {
        var firstName = user.firstName;
        var lastName = user.lastName;

        // Validate fields
        if (!firstName || !lastName) {
            return $rootScope.$broadcast("alert:add", {
                msg: "Please fill in all the fields!",
                type: "warning"
            });
        }

        // Edit account details
        $http.put('/api/account/', {
            firstName: firstName,
            lastName: lastName
        }).then(function(result) {
            if (result.data.success) {
                $rootScope.$broadcast("alert:add", {
                    msg: "Account details changed successfully.",
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

    $scope.changePassword = function(user) {
        var newPassword = user.newPassword;
        var newPasswordConfirm = user.newPasswordConfirm;

        // Validate fields
        if (!newPassword || !newPasswordConfirm) {
            return $rootScope.$broadcast("alert:add", {
                msg: "Please fill in all the fields!",
                type: "warning"
            });
        }

        if (newPassword !== newPasswordConfirm) {
            return $rootScope.$broadcast("alert:add", {
                msg: "You did not confirm your password correctly.",
                type: "warning"
            });
        }

        // Change user password
        $http.put('/api/account/password', {
            password: newPassword
        }).then(function(result) {
            if (result.data.success) {
                $rootScope.$broadcast("alert:add", {
                    msg: "Account details changed successfully.",
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

    $scope.deleteAccount = function() {

        // Delete user account
        $http.delete('/api/account').then(function(result) {
            if (result.data.success) {
                $uibModalInstance.close();
                $rootScope.$broadcast("alert:add", {
                    msg: "Account successfully deleted.",
                    type: "success"
                });
                $state.go('authentication');

            } else {
                $rootScope.$broadcast("alert:add", {
                    msg: result.data.message,
                    type: "danger"
                });
            }

        });
    };

    $scope.close = function() {
        $uibModalInstance.close();
    };

});
