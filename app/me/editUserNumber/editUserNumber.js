app.controller('eitUserNumberCtrl',['$rootScope','$scope','userService',function ($rootScope,$scope,userService) {
    $scope.finish = function () {
        var user ={
            userId  : $rootScope.me.id,
            name : $rootScope.me.name,
            sex : $rootScope.me.sex,
            hobby : $rootScope.me.hobby,
            describtion : $rootScope.me.myDescribtion,
            userNumber : $rootScope.me.userNumber
        };
        userService.editUser(user).success(function () {
            myNavigator.popPage();
        });

    }
}]);