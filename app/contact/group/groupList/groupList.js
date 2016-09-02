app.controller('groupListCtrl',['$rootScope','$scope','groupService',function ($rootScope,$scope,groupService) {
    $scope.groupList = [];
    groupService.getGroupList($rootScope.me.id).success(function (res) {

        for(var i =0 ; i < res.data.length ; i++){

            $scope.groupList.push(res.data[i]);

        }
    });

    $scope.load = function ($done) {
        var groupList = [];
        groupService.getGroupList($rootScope.me.id).success(function (res) {
            for(var i =0 ; i < res.data.length ; i++){
                groupList.push(res.data[i]);
            }
            $scope.groupList = groupList;
            $done();
        });
    };
    $scope.goToDetail = function (group) {
        myNavigator.pushPage('app/contact/group/groupDetail/groupDetail.html',
            {data : {group : group}});
    }


}]);