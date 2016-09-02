app.controller('passPlanCtrl',['$rootScope','$scope','planService','$filter',function ($rootScope,$scope,planService,$filter) {
    $scope.planList = myNavigator.topPage.data.planList;
    $scope.quasiPlanList = [];

    planService.getQuasiPlanList($rootScope.me.id).success(function (res) {

        for(var i = 0;  i<res.data.length;i++ ){

            /*$scope.quasiPlanList.push(res.data[i]);*/
            var plan = {
                planId : res.data[i].id,
                text : res.data[i].text,
                planTime : new Date(res.data[i].planTime),
                rank : res.data[i].planRank,
                detail : res.data[i].planDetail,
                addition : res.data[i].planAddition,
                userId : res.data[i].userId,
                sourceId : res.data[i].sourceId,
                color : $filter('rankToColor')(res.data[i].planRank)
            };

            $scope.quasiPlanList.push(plan);
        }
    });
    $scope.dialogs = {};

    $scope.passPlan = function (dlg,quasiPlan) {
        $scope.quasiPlan = quasiPlan;
        if(!$scope.dialogs[dlg]){
            ons.createDialog(dlg,{parentScope : $scope}).then(function (dialog) {
                $scope.dialogs[dlg] = dialog;
                dialog.show();
            })
        }
        else {
            $scope.dialogs[dlg].show();
        }

    }
}]);