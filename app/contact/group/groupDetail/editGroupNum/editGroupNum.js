app.controller('editGroupNumCtrl',['$scope','groupService',function($scope,groupService) {
    $scope.group = myNavigator.topPage.data.group;
        $scope.finish = function () {
        groupService.editGroup($scope.group).success(function () {
            myNavigator.popPage();

        })
    }
}]);