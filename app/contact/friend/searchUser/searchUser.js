app.controller('searchUserCtrl',['$scope','userService',function ($scope,userService) {
    $scope.searchText ="";
    $scope.searchUser = function () {
        userService.searchUser($scope.searchText).success(function (res) {
            $scope.user = res.data;
            if($scope.user==null){
                alert('用户不存在')
            }
            else{

                myNavigator.pushPage('app/contact/friend/searchUser/searchUserDetail/searchUserDetail.html',
                    {data : {user : $scope.user}})
            }
        })
    }
    $scope.createGroup = function () {
        myNavigator.pushPage('app/contact/group/editType/editType.html')
    }
}]);