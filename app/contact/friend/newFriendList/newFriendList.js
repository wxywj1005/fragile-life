app.controller('newFriendListCtrl',['$rootScope','$scope','$timeout',
    'friendService',function ($rootScope,$scope,$timeout,friendService) {
    $scope.friendList = [];
    friendService.getNewFriendList($rootScope.me.id).success(function (res) {
        for(var i = 0 ; i < res.data.length ; i++){
                $scope.friendList.push(res.data[i]);
        }
    });
    $scope.accept = function (user_id) {
        var userInfo = {
          target_id : $rootScope.me.id,
            start_id : user_id,
            isPass : "0"
        };
        //接受后，在新好友列表中删除该好友
       friendService.addSure(userInfo).success(function () {
           for(var i = 0 ; i < $scope.friendList.length ; i++){
                if($scope.friendList[i].id == user_id){
                    $scope.friendList.splice(i,1);
                }
           }
       });
    }
    $scope.load = function ($done) {

            friendService.getNewFriendList($rootScope.me.id).success(function (res) {
                var friendList = [];
                for(var i = 0 ; i < res.data.length ; i++){
                    friendList.push(res.data[i]);
                };
                $scope.friendList = friendList;
                $done();

        })

    }
}]);