function AlertController($scope) {
    var that = this;

    $scope.$on('alert:add', function(event, alert) {
        that.addAlert(alert);
    });

    this.alerts = [];

    this.addAlert = function(alert) {
        this.alerts = [];
        this.alerts.push({ type: alert.type, msg: alert.msg });
    };

    this.closeAlert = function(index) {
        this.alerts.splice(index, 1);
    };

};

stickItComponent.component('alertComponent', {
    templateUrl: "/javascripts/components/alert.html",
    controller: AlertController
});
