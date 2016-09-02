app.controller('editSexCtrl',['$rootScope','$scope','userService',function ($rootScope,$scope,userService) {
    $scope.man = "男";
    $scope.woman ="女";

    $scope.chooseMan = function () {
        $rootScope.me.sex = $scope.man;
        userService.editUser($scope.user()).success(function () {
            $scope.dialog.hide();
        });
    }
    $scope.chooseWoman = function () {
        $rootScope.me.sex = $scope.woman;
        userService.editUser($scope.user()).success(function () {
            $scope.dialog.hide();
        });
    }
    $scope.user = function () {
        var user = {
            userId : $rootScope.me.id,
            name : $rootScope.me.name,
            sex : $rootScope.me.sex,
            hobby : $rootScope.me.hobby,
            describtion : $rootScope.me.describtion
        }
        return user;
    }

}])