app.controller('groupFriendListCtrl',['$rootScope','$scope','groupService','friendService',
    function ($rootScope,$scope,groupService,friendService) {
    $scope.group = myNavigator.topPage.data.group;

        $scope.groups = [];
        $scope.friendList = [];

        friendService.getFriendList($rootScope.me.id).success(function (res) {
            for(var i =0 ; i < res.data.length ; i++){
                res.data[i].isSelected = false;
                $scope.friendList.push(res.data[i]);
            }
        });
        $scope.groupUsers = [];
        var groupUser = {
            groupId : $scope.group.groupId,
            userId : $rootScope.me.id
        };
        $scope.groupUsers.push(groupUser);    //添加群主自己

         /*选中与取消好友*/
        $scope.selectFriend = function (friend) {
            friend.isSelected = !friend.isSelected;
        };
        $scope.createGroup = function () {

            for(var i = 0; i < $scope.friendList.length ; i++){
                if($scope.friendList[i].isSelected){                      //选中的把user_id赋值给menber
                    $scope.group.groupMember = $scope.friendList[i].id;
                    var groupUser = {
                        groupId : $scope.group.groupId,
                        userId : $scope.friendList[i].id

                    };
                    $scope.groupUsers.push(groupUser);
                }
            }
            console.log($scope.groupUsers);
            groupService.addMembers($scope.groupUsers).success(function () {
                myNavigator.pushPage('index.html');
            })
        }
}]);