app.controller('editMyDescCtrl',['$rootScope','$scope',function ($rootScope,$scope) {
        $scope.finish = function () {
            myNavigator.popPage();
        }
}]);
