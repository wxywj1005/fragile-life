app.controller('searchUserDetailCtrl',['$rootScope','$scope','friendService',function ($rootScope,$scope,friendService) {

    $scope.user = myNavigator.topPage.data.user;

    $scope.addRequest=function(){

        $scope.addInfo = {
            start_id : $rootScope.me.id,
            target_id : $scope.user.id
        };
        friendService.addRequest($scope.addInfo).success(function () {
             myNavigator.pushPage('index.html');
        })
    }
}]);