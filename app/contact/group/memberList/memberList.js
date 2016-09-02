app.controller('memberListCtrl',['$rootScope','$scope','groupService','friendService',
    function ($rootScope,$scope,groupService,friendService) {
        $scope.group = myNavigator.topPage.data.group;

        $scope.groups = [];
        $scope.memberList = [];

        groupService.getMemberList($scope.group.id).success(function (res) {
            for(var i =0 ; i < res.data.length ; i++){
                res.data[i].isSelected = true;
                $scope.memberList.push(res.data[i]);
            }
        });
        $scope.groupUsers = [];
        var groupUser = {
            groupId : $scope.group.groupId,
            userId : $rootScope.me.id
        };
        $scope.groupUsers.push(groupUser);    //添加群主自己

        /*选中与取消好友*/
        $scope.selectMember = function (member) {
            member.isSelected = !member.isSelected;
        };
        $scope.goToGroupPlan = function () {
            var memberList = [] ;
            for(var i = 0; i < $scope.memberList.length ; i++){
                if($scope.memberList[i].isSelected){                      //选中的把user_id赋值给menber
                    memberList.push($scope.memberList[i]);
                }
            }

            myNavigator.pushPage('app/contact/group/groupAddPlan/groupAddPlan.html',
                {data : {members : memberList}});

        }
    }]);