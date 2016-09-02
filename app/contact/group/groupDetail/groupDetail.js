app.controller('groupDetailCtrl',['$scope','groupService',function ($scope,groupService) {

    $scope.group = myNavigator.topPage.data.group;

    $scope.editGroupNum = function () {

        myNavigator.pushPage('app/contact/group/groupDetail/editGroupNum/editGroupNum.html',
            {data : { group : $scope.group}})
    }

    $scope.goToMembers = function () {
        myNavigator.pushPage('app/contact/group/memberList/memberList.html',
            {data : {group : $scope.group}});
    }
}]);