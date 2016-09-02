app.controller('editDetailCtrl',['$scope',function ($scope) {
    $scope.newPlan = myNavigator.topPage.data.newPlan;
    $scope.finish = function () {
        myNavigator.popPage();
    };

}]);