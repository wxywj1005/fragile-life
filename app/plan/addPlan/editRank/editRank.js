app.controller('editRankCtrl',['$scope','$timeout',function ($scope,$timeout) {
    var data = myNavigator.topPage.data;
    $scope.newPlan = data.newPlan;
    $scope.ranks = [1,2,3,4,5];
    $scope.select = function (rank) {

        $scope.newPlan.rank = rank;
    };
    $scope.finish = function () {
        myNavigator.popPage();
    }
}]);