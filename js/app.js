
'use strict';
var app = ons.bootstrap('planDemo',['onsen']);
app.run(['$rootScope',function ($rootScope) {
    $rootScope.me = null;
    $rootScope.isEmpty = true;

}]);
/*
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push(function () {
        return{
            response : function (response) {
                if(response.data.status!=200){

                    console.log('可以的');
                    return response;
                }
                else {
                    return response;
                }
            }
        }
    });
})*/
