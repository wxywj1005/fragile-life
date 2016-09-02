app.factory('planService',['$http',function ($http) {
    return {

        getPlanList: function (params) {
            return $http.post(appConfig.baseUrl + 'plan/list', params)
        },
        getQuasiPlanList: function (userId) {
            return $http.get(appConfig.baseUrl + 'plan/quasiPlanList/' + userId)
        },
        getSearchList: function (params) {
            return $http.post(appConfig.baseUrl + 'plan/list/search', params)
        },
        getPlan: function (planId) {
            return $http.get(appConfig.baseUrl + 'plan/detail/' + planId);
        },
        passPlan: function (planId) {
            return $http.get(appConfig.baseUrl + 'plan/pass/' + planId);
        },
        createPlan: function (plan) {
            return $http({
                method: 'POST',
                url: appConfig.baseUrl + 'plan/create',
                data: plan
            });
        },
        sharePlan: function (plan) {
            return $http.post(appConfig.baseUrl + 'plan/share', plan)
        },
        deletePlan: function (planId) {
            return $http.get(appConfig.baseUrl + 'plan/remove/' + planId);
        },
        editPlan: function (plan) {
            return $http.post(appConfig.baseUrl + 'plan/edit', plan);
        },
        groupAddPlan: function (plans) {
            return $http.post(appConfig.baseUrl + 'plan/groupAdd', plans)
        },
        getQuasiPlanNum: function (userId) {
            return $http.get(appConfig.baseUrl + 'plan/quasiPlanNum/' + userId)
        }
    }
}])
    .factory('userService',['$http',function ($http) {
        return{
            regist : function (user) {
                return $http.post(appConfig.baseUrl+'user/regist',user);
            },
            login : function (user) {
                return $http.post(appConfig.baseUrl+'user/login',user);
            },
            editUser : function (user) {
                return $http.post(appConfig.baseUrl+'user/edit',user)
            },
            searchUser : function (userNo) {
                return $http.get(appConfig.baseUrl+'user/search/'+userNo);
            }
        }
    }])
    .factory('timeService',function () {
    var months = [];
    var hours = [];
    var minutes = [];
    for(var i =1 ;i<61;i++){
        if(i<13){
            months.push(i);
            hours.push(i);
            minutes.push(i);
        }
        else if(i<25){
            hours.push(i);
            minutes.push(i);
        }
        else {
            minutes.push(i);
        }
    }

    return {
        getMonths : function () {

            return months;
        },
        getHours : function () {

            return hours;
        },
        getMinutes : function () {

            return minutes;
        }
    }
})
    .factory('friendService',['$http',function ($http) {
        return{
            getFriendList : function (user_id) {
                return $http.get(appConfig.baseUrl+'friend/list/'+user_id)
            },
            getNewFriendList : function (user_id) {
                return $http.get(appConfig.baseUrl+'friend/newFriendList/'+user_id)
            },
            addRequest : function (addInfo) {
                return $http.post(appConfig.baseUrl+'friend/addRequest',addInfo)
            },
            addSure : function (sureInfo) {
                return $http.post(appConfig.baseUrl+'friend/addSure',sureInfo)
            },
            getNewFriendNum : function (userId) {
                return $http.get(appConfig.baseUrl+'friend/newFriendNum/'+userId)
        }
        }
    }])
    .factory('groupService',['$http',function ($http) {
        return{
            createGroup : function (group) {
                return $http.post(appConfig.baseUrl+'group/create',group);
            },
            searchGroup : function (groupNumber) {
                return $http.get(appConfig.baseUrl+'group/search');
            },
            addGroup : function (group) {
                return $http.post(appConfig.baseUrl+'group/add')
            },
            getGroupList :  function (userId) {
            return $http.get(appConfig.baseUrl+'group/list/'+userId);
        },
            addMembers : function (groupUsers) {
                return $http.post(appConfig.baseUrl+'group/add/members',groupUsers)
            },
            editGroup : function (group) {
                return $http.post(appConfig.baseUrl+'group/edit',group)
            },
            getMemberList :  function (groupId) {
                return $http.get(appConfig.baseUrl+'group/members/'+groupId);
            }

        }
    }])
;