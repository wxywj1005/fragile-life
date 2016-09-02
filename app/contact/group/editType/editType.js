app.controller('editTypeCtrl',['$scope',function ($scope) {
    $scope.types = {
        classmate : "同学",
        colleague : "同事",
        friend : "好友",
        family : "家庭",
        hobby : "兴趣",
        fans : "粉丝",
        life : "生活",
        game : " 游戏",
        study : "学习",
        traffic : "交通",
        techlonogy : "技术",
        brand : "品牌"
    };
    $scope.selectType = function (type) {
        $scope.type = type;
        myNavigator.pushPage('app/contact/group/createGroup/createGroup.html',
            {data : {type : $scope.type}});
    }
}]);