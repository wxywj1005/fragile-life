app.controller('shareFListCtrl',['$rootScope','$scope','friendService',function ($rootScope,$scope,friendService) {
    $scope.plan = myNavigator.topPage.data.plan;
    $scope.friendList = [];
    friendService.getFriendList($rootScope.me.id).success(function (res) {

        for(var i =0 ; i < res.data.length ; i++){

            $scope.friendList.push(res.data[i]);

        }
    });
    $scope.dialogs = {};
    $scope.selectFriend = function (dlg,friendId) {
        $scope.friendId = friendId;
        if(!$scope.dialogs[dlg])
            ons.createDialog(dlg,{parentScope : $scope}).then(function (dialog) {
                $scope.dialogs[dlg] = dialog;
                $scope.dialogs[dlg].show();
            });
        else{
            $scope.dialogs[dlg].show();
        }
    }


}]);