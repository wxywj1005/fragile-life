app.controller('planListCtrl',['$rootScope','$scope','planService','$filter',function ($rootScope,$scope,planService,$filter) {

 /*  if(true){
       myNavigator.pushPage('app/contact/group/groupDetail/groupDetail.html');
       return;
   }*/
    if(!$rootScope.me){
        myNavigator.pushPage('app/login/login.html');
        return;
    }
/* 测试自定义push-hook
  if(!$rootScope.me){
        myNavigator.pushPage('app/test/testPush.html');
        return;
    }*/
    /*    var time = new Date(2016,6,26,2,20,10);
    $scope.planList=[{id:'1', text:'去爬山', time: time,rank:3},{id:'2',text:'吃早餐',time:time,rank:2}];*/
    /*$scope.planList = planService.getPlanList();*/
    $scope.planList = [];
    $scope.pageSize = 16;
    $scope.page = 1;
    $scope.listState;        //1代表正常获取,2代表按时间排序,3代表按重要性排序，4代表按筛选
    $scope.isFirstPage = true;
    $scope.ranks = [1,2,3,4,5];
    $scope.quasiPlanNum = 0;
  /*  $scope.timeClick = function () {
        console.log($scope.plans.order);
    }
    $scope.rankClick = function () {
        alert($scope.rankRadio);
    }*/

/*    $scope.orderByWho = function (plan) {
/!*        if($scope.timeRadio==true){
         return plan.time;
         }
         if($scope.rankRadio==true){
         return plan.rank
         }
         return;*!/
return $scope.timeRadio?plan.time:plan.rank;
    };*/



/*    $scope.isTime =false;
    $scope.orderByTime = function () {
        $scope.isTime = !$scope.isTime;
        if($scope.isTime){
            $scope.planList = $filter('oderBy')('time')/!*$scope.planList,$scope.planList.plan.time*!/
        }
    }*/





/*获取quasiPlanNum*/
    planService.getQuasiPlanNum($rootScope.me.id).success(function (res) {
        $scope.quasiPlanNum = res.data;
    })

    /*封装params*/
    $scope.params  = function () {
        var params =  {
            userId : $rootScope.me.id,
            pageSize : $scope.pageSize,
            page : $scope.page
        };
        return params;
    };
    /*赋值planList*/
    $scope.setPlanList = function (res) {


/*        if(res.data.length == 0){
            $scope.
        }*/
        for(var i = 0; i<res.data.length;i++ ){
            var plan = {
                planId : res.data[i].id,
                text : res.data[i].text,
                planTime : new Date(res.data[i].planTime),
                rank : res.data[i].rank,
                detail : res.data[i].detail,
                addition : res.data[i].addition,
                color : $filter('rankToColor')(res.data[i].rank)
            };
            $scope.planList.push(plan);
        }

    };

/*正常获取安排列表*/

        $scope.getPlanList = function (callback) {
            if($scope.listState != 1){                  //之前不是按正常排序，则清空列表，改为正常排序状态，页数也变为初始
                $scope.listState = 1;
                $scope.page = 1;
                $scope.planList = [];
            }
            planService.getPlanList($scope.params()).success(function (res) {


                $scope.setPlanList(res);
                $scope.page++;
                callback(res);
            });
        }
    $scope.getPlanList();


    /*按时间排序*/
    $scope.orderByPlanTime = function (cb) {
      
        if($scope.listState != 2){
            $scope.listState = 2;
            $scope.page = 1;
            $scope.planList = [];
        }
        var params = {
            userId : $rootScope.me.id,
            page : $scope.page,
            pageSize : $scope.pageSize,
            orderSpec : 'order by planTime asc'
        };

        planService.getPlanList(params).success(function (res) {


            $scope.setPlanList(res);
            $scope.page++;
            cb(res);

        })
    };
   /*按重要性排序*/
    $scope.orderByRank = function (cb) {
        if($scope.listState != 3){
            $scope.listState = 3;
            $scope.page = 1;
            $scope.planList = [];
        }
        var params = {
            userId : $rootScope.me.id,
            page : $scope.page,
            pageSize : $scope.pageSize,
            orderSpec : 'order by rank asc'
        };

        planService.getPlanList(params).success(function (res) {


            $scope.setPlanList(res);
            $scope.page++;
            cb(res);
        })
    };
    /*按重要性筛选 由选择重要性和上拉刷新触发，选择重要性的时候要传一个选择了哪个rank，上拉刷新则不用，记住上一个rank
    * 4-8为重要性区域  rank+3
    * */
    $scope.filterRank = function (rank) {

            $scope.listState = 3+rank;
            $scope.page = 1;
            $scope.planList = [];

        var params = {
            userId : $rootScope.me.id,
            page : $scope.page,
            pageSize : $scope.pageSize,
            rankFilter : rank
        };

        planService.getPlanList(params).success(function (res) {
            $scope.setPlanList(res);
            $scope.page++;
        })
    };
    $scope.filterRankRef = function (cb) {

        var params = {
            userId : $rootScope.me.id,
            page : $scope.page,
            pageSize : $scope.pageSize,
            rankFilter : $scope.listState-3
        };

        planService.getPlanList(params).success(function (res) {
            $scope.setPlanList(res);
            $scope.page++;
            cb(res);
        })
    };

    $scope.passPlan = function () {
        myNavigator.pushPage('app/plan/passPlan/passPlan.html',{data : {planList : $scope.planList}})  ;
    };

    /*错误
     * 有登录获取user中的plans   出现死循环
     * */

/*    var plans = $rootScope.me.plans;
    for(var i =0 ;i<plans.length ; i++){
        var plan = {
            planId : plans[i].id,
            text : plans[i].text,
            time : new Date(plans[i].year,plans[i].month,
                plans[i].day,plans[i].hour,plans[i].minute),
            rank : plans[i].rank,
            detail : plans[i].detail,
            addition : plans[i].addition,
            color : $filter('rankToColor')(plans[i].rank)
        };
        $scope.planList.push(plan);
    }*/

/*serachPlan*/
    $scope.searchPlanText="";
    $scope.searchPlan = function () {
        var params = {
            user_id : $rootScope.me.id,
            searchPlanText : $scope.searchPlanText
        };

        planService.getSearchList(params).success(function (res) {

            $scope.setPlanList(res);
        })
    };
    $scope.exitSearch = function () {
        if($scope.searchPlanText == ''){
            planService.getPlanList($scope.params()).success(function (res) {
                $scope.setPlanList(res);
            })
        }
    };

    $scope.goToDetail = function (planId) {

        myNavigator.pushPage('app/plan/detail.html' , {data:{planId : planId}})

    };
    $scope.goToAddPlan = function () {
        myNavigator.pushPage('app/plan/addPlan/addPlan.html',{animation :'fade'})
    }
}])



    .controller('planDetailCtrl',['$scope','$filter','planService',function ($scope,$filter,planService) {

        /*    var time = new Date(2016,6,26,9,20,10);
         $scope.plan = {id : '2',text:'去爬山',time:time,rank:2,
         detail:'和谁是谁去爬白云山',addition : '带登山包'};*/
        $scope.plan={

        };
        var page = myNavigator.topPage.data;
        $scope.planId = page.planId;
/*        $scope.plan = {
            planId: null,
            text: " ",
            time: new Date(0, 0,
                0, 0, 0),
            rank: 0,
            detail: " ",
            addition: " "
        };*/
        planService.getPlan($scope.planId).success(function (res) {
            $scope.plan = {
                planId : res.data.planId,
                text : res.data.text,
                planTime : new Date(res.data.planTime),
                rank : res.data.planRank,
                detail : res.data.planDetail,
                addition : res.data.planAddition,
                 color : $filter('rankToColor')(res.data.rank)
            };


/*            alert($scope.time.getFullYear());*/


/*            $scope.plan.planId = res.data.planId;
            $scope.plan.text = res.data.text;
            $scope.plan.addition = res.data.planAddition;
            $scope.plan.time = new Date(res.data.planTime);
            $scope.plan.detail = res.data.planDetail;



            $scope.plan.rank = res.data.planRank;*/
/*            $scope.year = res.data.planYear;
            $scope.time.month = res.data.planMonth;

            $scope.time.day = res.data.planDay;
            $scope.time.hours = res.data.planHour;
            $scope.time.minute = res.data.planMinute ;*/


        });


        $scope.dialogs = {};
        $scope.deletePlan = function (dlg) {
            if(!$scope.dialogs[dlg]){
                ons.createDialog(dlg,{parentScope : $scope}).then(function (dialog) {
                    $scope.dialogs[dlg] = dialog;
                    dialog.show();
                })
            }
            else {
                $scope.dialogs[dlg].show();
            }
        };








        $scope.editting = false;
        $scope.edit  = function () {
            $scope.editting = !$scope.editting;
        };
        $scope.edited = function () {


            var newPlan = {
                planId :$scope.planId,
                planTime : $scope.plan.planTime,
                text : $scope.plan.text,
                rank : $scope.plan.rank,
                detail : $scope.plan.detail,
                addition : $scope.plan.addition
            };

            planService.editPlan(newPlan).success(
               function () {
                   $scope.editting = !$scope.editting;

               }

            )
        };
        $scope.shareToFriend = function () {
            myNavigator.pushPage('app/plan/sharePlan/friendList/friendList.html',
                {data : {plan : $scope.plan}});
        };
    }])

.controller('addPlanCtrl',['$rootScope','$scope','planService','timeService',function ($rootScope,$scope,planService,timeService) {
/*    $scope.hours  = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
    $scope.minutes=[];*/

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

        var plan = {
            text : $scope.newPlan.text,
            planTime : planTime,
            rank : $scope.newPlan.rank,
            detail : $scope.newPlan.detail,
            addition : $scope.newPlan.addition,
            userId : $rootScope.me.id
        };
        planService.createPlan(plan).success(function () {
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
    $scope.look = function () {
        alert($scope.time)
    }
    $scope.editRank = function () {
        myNavigator.pushPage('app/plan/addPlan/editRank/editRank.html',
            {data : {newPlan : $scope.newPlan}})
    }
}])



;
