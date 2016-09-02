app.controller('hobbyCtrl',['$rootScope','$scope','userService',function ($rootScope,$scope,userService) {
    $scope.finish = function () {
        var user ={
            userId  : $rootScope.me.id,
            name : $rootScope.me.name,
            sex : $rootScope.me.sex,
            hobby : $rootScope.me.hobby,
            describtion : $rootScope.me.myDescribtion
        };
        userService.editUser(user).success(function () {
            myNavigator.popPage();
        });

    }
}]);