app.controller('friendCtrl',['$rootScope','$scope','friendService',function ($rootScope,$scope,friendService) {
    $scope.add = function () {
        myNavigator.pushPage('app/contact/friend/searchUser/searchUser.html');
    }
    $scope.newFriendNum = 0;
      friendService.getNewFriendNum($rootScope.me.id).success(function (res) {
        $scope.newFriendNum = res.data;
    })
}]);