app.controller('passPlanDlgCtrl',['$scope','planService',function ($scope,planService) {
    $scope.passPlan = function () {
        console.log($scope.quasiPlan);
        planService.passPlan($scope.quasiPlan.planId).success(function () {
            for(var i = 0; i < $scope.quasiPlanList.length ; i++){
                if($scope.quasiPlanList[i].planId == $scope.quasiPlan.planId){
                    $scope.quasiPlanList.splice(i,1);
                    break;
                }
            }
            $scope.quasiPlan.isPass = '0';
            $scope.planList.push($scope.quasiPlan);
            myNavigator.popPage();
            passPlanDlg.hide();
        })
    }
}])