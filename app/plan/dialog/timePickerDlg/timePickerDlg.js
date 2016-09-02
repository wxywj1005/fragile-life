app.controller("MyCtrl", ['$scope',function MyCtrl($scope) {

    $scope.ok = function () {
        $scope.time.setHours($scope.newPlan.planTime.hour)
        $scope.time.setMinutes($scope.newPlan.planTime.minute)
        $scope.timePickerDlg.hide();
    }

}]);