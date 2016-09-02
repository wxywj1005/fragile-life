app.controller('shareDlgCtrl',['$rootScope','$scope','planService',function ($rootScope,$scope,planService) {
    $scope.sharePlan = function () {
        var planTime = $scope.plan.planTime.getTime();

        var plan ={
            text : $scope.plan.text,
            time : planTime,
            rank : $scope.plan.rank,
            detail : $scope.plan.detail,
            addition : $scope.plan.addition,
            userId : $scope.friendId,
            sourceId : $rootScope.me.id
        };

        planService.sharePlan(plan).success(function () {
            $scope.shareDlg.hide();
            myNavigator.pushPage('index.html');
        })
    }
}]);