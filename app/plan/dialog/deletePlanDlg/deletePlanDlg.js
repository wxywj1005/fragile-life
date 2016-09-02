app.controller('deletePlanDlgCtrl',['$scope','planService',function ($scope,planService) {
    $scope.sure = function () {
        planService.deletePlan($scope.planId).success(function () {
            /*dialog*/
            $scope.dialog.hide();
            myNavigator.resetToPage('index.html', {animation: 'fade'});
        });
    }

}])