app.controller('createGroupCtrl',['$rootScope','$scope','groupService',
    function ($rootScope,$scope,groupService) {


    $scope.group = {
        groupName : "",
        groupNumber : "",
        groupType : myNavigator.topPage.data.type,
        groupOwnner : $rootScope.me.id
    };
    /*选择好友*/
    $scope.showFriendList = function () {
        groupService.createGroup($scope.group).success(function (res) {
            $scope.group.groupId = res.data.id;
            myNavigator.pushPage('app/contact/group/friendList/friendList.html',
                {data : {group : $scope.group}});
        })
    };
/*    $scope.createGroup = function () {
        groupService.createGroup($scope.group).success(function () {
            myNavigator.popPage();
        })
    }*/
}]);