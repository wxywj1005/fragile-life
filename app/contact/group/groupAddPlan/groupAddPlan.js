app.controller('groupAddPlanCtrl',['$rootScope','$scope','planService','timeService','groupService',
    function ($rootScope,$scope,planService,timeService,groupService) {


    $scope.members = myNavigator.topPage.data.members;

    $scope.hours = timeService.getHours();
    $scope.minutes = timeService.getMinutes();
    $scope.ranks = [1,2,3,4,5];
    $scope.newPlan={text:'',
        rank:null,
        planTime:
        {
            year:2016,
            month:6,
            day:25,
            hour: 0 ,
            minute:0
        },
        detail:'',
        addition:''
    };
        $scope.time=new Date($scope.newPlan.planTime.year,
            $scope.newPlan.planTime.month,
            $scope.newPlan.planTime.day
        );//用于显示timePicker pick后的时间
    $scope.addPlan = function () {
        var date = new Date($scope.newPlan.planTime.year,
            $scope.newPlan.planTime.month,
            $scope.newPlan.planTime.day,
            $scope.newPlan.planTime.hour,
            $scope.newPlan.planTime.minute);

        var planTime = date.getTime();


        var groupPlans = [];
        for(var i = 0;i < $scope.members.length; i++){
            var plan = {
                text : $scope.newPlan.text,
                planTime : planTime,
                rank : $scope.newPlan.rank,
                detail : $scope.newPlan.detail,
                addition : $scope.newPlan.addition,
                userId :$scope.members[i].id ,
                sourceId : $rootScope.me.id
            };
            groupPlans.push(plan);
        }


        planService.groupAddPlan(groupPlans).success(function () {
            myNavigator.pushPage('index.html');
        })
    };
    $scope.editDetail = function () {
        myNavigator.pushPage('app/plan/addPlan/editDetail/editDetail.html',
            {data : {newPlan : $scope.newPlan}});
    };
    $scope.editAddition = function () {
        myNavigator.pushPage('app/plan/addPlan/editAddition/editAddition.html',
            {data : {newPlan : $scope.newPlan}});
    };
    $scope.dialogs = {};
    $scope.editTime = function (dlg) {
        if(!$scope.dialogs[dlg]){
            ons.createDialog(dlg,{parentScope : $scope}).then(function (dialog) {
                $scope.dialogs[dlg] = dialog;
                dialog.show()
            })
        }
        else {
            $scope.dialogs[dlg].show();
        }
    };
    $scope.editRank = function () {
        myNavigator.pushPage('app/plan/addPlan/editRank/editRank.html',
            {data : {newPlan : $scope.newPlan}})
    }
}])