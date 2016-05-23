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

stickIt.controller('SettingsModalControllerInstance', function($scope, $rootScope, $uibModalInstance, $http) {

	$scope.user={};

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

        // Log the user in
        $http.put('/api/account/', {
            firstName: firstName,
            password: lastName
        }).then(function(result) {
            if (result.data.success){
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

	$scope.changePassword = function() {

	};

    $scope.close = function() {
        $uibModalInstance.close();
    };

});
