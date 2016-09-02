app.controller('MeCtrl',['$rootScope','$scope','userService',function ($rootScope,$scope,userService) {
    $scope.isNameEditting = false;
    $scope.editNameToggle = function () {


        userService.editUser($scope.user()).success(function () {
            $scope.isNameEditting = !$scope.isNameEditting;
        })
    };
    $scope.editName = function () {



            $scope.isNameEditting = !$scope.isNameEditting;

    };




    $scope.dialogs = {};
/*    $scope.editSex= function (dlg) {
        if(!$scope.dialogs[dlg]){
            ons.createDialog(dlg,{parent : $scope}).then(function (dialog) {
                $scope.dialogs[dlg] =dialog;

                dialog.show()必须写在回调这里，涉及回调函数的会非阻塞执行，所以如果这样写下面的$scope.dialogs会是undefine

               console.log($scope.dialogs)
            });
        }
            $scope.dialogs[dlg].show()
    };*/

    $scope.editSex= function (dlg) {
        if(!$scope.dialogs[dlg]){
            ons.createDialog(dlg,{parent : $scope}).then(function (dialog) {
                $scope.dialogs[dlg] =dialog;
                $scope.dialogs[dlg].show();
            });
        }
        else {
            $scope.dialogs[dlg].show();
        }

    };

    $scope.isHobbyEditting = false;
    $scope.editHobbyToggle = function () {

        userService.editUser($scope.user()).success(function () {
            $scope.isHobbyEditting = !$scope.isHobbyEditting;
        })
    };






    $scope.user = function () {
        var user ={
            userId : $rootScope.me.id,
            name : $rootScope.me.name,
            sex : $rootScope.me.sex,
            hobby : $rootScope.me.hobby,
            describtion : $rootScope.me.myDescribtion,
            userNumber : $rootScope.me.userNumber
        };
            return user;
    };

/*
* 视图引起rootscope改变 rootscope会自动更新scope吗？   并不会，亲测
* */
 /*   $scope.user = {
        userId : $rootScope.me.id,
        name : $rootScope.me.name,
        sex : $rootScope.me.sex,
        hobby : $rootScope.me.hobby,
        describtion : $rootScope.me.describtion
    }*/

    $scope.exit = function () {
        $rootScope.me = null;
        myNavigator.pushPage('app/login/login.html',{animation:'fade'});
    };

    $scope.editHobby=function (){
        myNavigator.pushPage('app/me/hobby/hobby.html')
    };
    $scope.editUserNumber = function () {
        myNavigator.pushPage('app/me/editUserNumber/editUserNumber.html')
    };
    $scope.editName = function () {
        myNavigator.pushPage('app/me/editName/editName.html')
    }
    $scope.editDesc = function () {
        myNavigator.pushPage('app/me/editMyDesc/editMyDesc.html')
    };

}]);