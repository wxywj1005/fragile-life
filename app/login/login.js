app.controller('loginCtrl',['$rootScope','$scope','userService','$timeout',function ($rootScope,$scope,userService,$timeout) {
/*    $scope.loginUserName = "";
    $scope.loginPassWord = "";
    $scope.regUserName = "";
    $scope.regPassWord = "";
    $scope.regPassWord2 = "";*/

$scope.goToReg = function () {
    myNavigator.pushPage('app/login/regist.html');
}
    $scope.turnToLogin = function () {
        myNavigator.popPage();
    }
/*登录用户*/
    $scope.showLoginInfo = false;
    $scope.loginUser = {
        username : '',
        password : ''
    };

/*注册用户*/
    $scope.showRegInfo = false;
    $scope.registUser = {
        username : '',
        password : '',
        password2 : ''
    };


/*tab ? login : regist*/
    $scope.isLogin = true;
    $scope.tabToggle = function () {
        $scope.isLogin = !$scope.isLogin;
    };
    
    $scope.login = function () {
        /*        var user = {
         username : $scope.loginUserName,
         password : $scope.loginPassWord
         };*/
        if ($scope.loginForm.$valid) {
            userService.login($scope.loginUser).success(function (res) {
                if (res.status == 'ok') {
                    $rootScope.me = res.data;
                    $rootScope.isEmpty = !$rootScope.isEmpty;
                    $scope.loginInfo = "登录成功";
                    myNavigator.pushPage('index.html')
                }
                else {
                    $scope.loginInfo = "用户名或密码错误"
                }

            })
        }
        else if($scope.loginForm.username.$error.required||$scope.loginForm.username.$error.minlength||
            $scope.loginForm.username.$error.maxlength){
            $scope.loginInfo = "请输入6-20位的用户名";
        }
        else if($scope.loginForm.password.$error){
            $scope.loginInfo = "请输入6-20位的密码";
        }
        $scope.showLoginInfo = true;
    }


    $scope.regist = function () {
        var registUser = {
            username : $scope.registUser.username,
            password : $scope.registUser.password
        };
        if($scope.regForm.$valid){
            if($scope.registUser.password == $scope.registUser.password2){
                userService.regist(registUser).success(function (res) {
                    if (res.status == 'ok') {
                        $scope.loginUser = registUser;

                        $scope.regInfo = "注册成功";
                        $timeout(function () {
                            $scope.tabToggle();
                        },300);
                    }
                    else {
                        $scope.showRegInfo = true;
                        $scope.regInfo  = "用户名已被注册";
                    }
                })
            }
            else {

                $scope.regInfo  = "两次密码输入不一致";
            }
        }
        else {
            if($scope.regForm.username.$error.required||$scope.regForm.username.$error.minlength
                ||$scope.regForm.username.$error.maxlength){

                $scope.regInfo  = "请输入6-20位的用户名";
            }
            else if($scope.regForm.password.$error.required||$scope.regForm.password.$error.minlength
                ||$scope.regForm.password.$error.maxlength){
                $scope.regInfo  = "请输入6-20位的密码";
            }
            else{
                $scope.regInfo  = "请输入6-20位的确认密码";
            }
        }
$scope.showRegInfo = true;

    }
}]);