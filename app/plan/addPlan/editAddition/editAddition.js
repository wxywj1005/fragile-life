app.controller('editAdditionCtrl',['$scope',function ($scope) {
    $scope.newPlan = myNavigator.topPage.data.newPlan;
    $scope.finish = function () {


        myNavigator.popPage();
    }
}]);