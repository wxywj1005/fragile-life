app.controller('friendListCtrl',['$rootScope','$scope','friendService',function ($rootScope,$scope,friendService) {
    $scope.friendList = [];
    friendService.getFriendList($rootScope.me.id).success(function (res) {

        for(var i =0 ; i < res.data.length ; i++){

            $scope.friendList.push(res.data[i]);

        }
    });

    $scope.load = function ($done) {
        var friendList = [];
        friendService.getFriendList($rootScope.me.id).success(function (res) {
            for(var i =0 ; i < res.data.length ; i++){
                friendList.push(res.data[i]);
            }
            $scope.friendList = friendList;
            $done();
        });
    }


}]);