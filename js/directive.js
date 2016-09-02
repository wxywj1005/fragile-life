
app.directive("ngTimeSelector", function () {
    return {
        restrict: 'EA',
        templateUrl:'templates/datePicker.html',
        scope: {
            hours: "=",
            minutes: "="
        },
        replace: true,
        link: function (scope, elem, attr) {

            //Create vars
            scope.period = "AM";

            /* Increases hours by one */
            scope.increaseHours = function () {

                //Check whether hours have reached max
                if (scope.hours < 23) {
                    scope.hours = ++scope.hours;
                }
                else {
                    scope.hours = 0;
                }
            };

            /* Decreases hours by one */
            scope.decreaseHours = function () {

                //Check whether hours have reached min
                scope.hours = scope.hours <= 0 ? 23 : --scope.hours;
            };

            /* Increases minutes by one */
            scope.increaseMinutes = function () {

                //Check whether to reset
                if (scope.minutes >= 59) {
                    scope.minutes = 0;
                }
                else {
                    scope.minutes++;
                }
            }

            /* Decreases minutes by one */
            scope.decreaseMinutes = function () {

                //Check whether to reset
                if (scope.minutes <= 0) {
                    scope.minutes = 59;
                }
                else {
                    scope.minutes = --scope.minutes;
                }
            }


            /* Displays hours - what the user sees */
            scope.displayHours = function () {

                //Create vars
                var hoursToDisplay = scope.hours;

                //Check whether to reset etc
                if (scope.hours > 12) {
                    hoursToDisplay = scope.hours - 12;
                }

                //Check for 12 AM etc
                if (hoursToDisplay == 0) {

                    //Set to am and display 12
                    hoursToDisplay = 12;
                }
                else {

                    //Check whether to prepend 0
                    if (hoursToDisplay <= 9) {
                        hoursToDisplay = "0" + hoursToDisplay;
                    }
                }

                return hoursToDisplay;
            }

            /* Displays minutes */
            scope.displayMinutes = function () {
                return scope.minutes <= 9 ? "0" + scope.minutes : scope.minutes;
            }

            /* Switches the current period by ammending hours */
            scope.switchPeriod = function () {
                scope.hours = scope.hours >= 12 ? scope.hours - 12 : scope.hours + 12;
            }
        }
    }
})


.directive('pushRefresh',function ($timeout,planService) {
    return{
        restrict : 'EA',
        link : function (scope,element,attr) {

            scope.isLock = false;
            scope.isMore = true;
            element.parent().on('scroll',function (event) {


                scope.scrollEle = element.parent().eq(0)['0'];


                if(scope.scrollEle.scrollHeight-scope.scrollEle.scrollTop-scope.scrollEle.clientHeight<70){
                  if(!scope.isLock){
                      console.log(scope.isLock)

                      scope.isLock = true;
                      setTimeout(function () {


                          switch (scope.listState){
                              case 1 : scope.getPlanList(function (res) {

                                  if(res.data.length==0){

                                      scope.isLock = false;
                                      return;
                                  }
                                  scope.isLock = false;
                                  ;

                              });break;
                              case 2 : scope.orderByPlanTime(function (res) {

                                  if(res.data.length==0){

                                      scope.isLock = false;
                                      return;
                                  }
                                  scope.isLock = false;
                                  ;

                              });break;
                              case 3 : scope.orderByRank(function (res) {

                                  if(res.data.length==0){

                                      scope.isLock = false;
                                      return;
                                  }
                                  scope.isLock = false;
                                  ;

                              });break;
                             default : scope.filterRankRef(function (res) {

                                 if(res.data.length==0){

                                     scope.isLock = false;
                                     return;
                                 }
                                 scope.isLock = false;
                                 ;

                             });break;
                          }

                    /*      scope.page++;
                          planService.getPlanList(scope.params()).success(function (res) {
                              if(res.data.length==0){
                                  alert("没有更多了");
                                  return;
                              }

                              scope.setPlanList(res);
                              console.log(scope.page);

                          })*/
                      },700)
                  }




                }
            })


        },
        replace : true
    }
})


.directive('badge',function (friendService,planService) {
    return {
        restrict: "EA",
        template : "<div ng-show='badge !=0 ? true : false' class='my-badge'>{{badge}}</div>",
        replace  : false,
        scope:{badge : '='}
    }
})
    .directive('myListItem',function () {
        return{
            restrict : 'EA',
            templateUrl: function (ele,attrs) {
                    /*根据有没有icon来选择不同的模板*/
                return attrs['icon']?'templates/iconListItem.html':'templates/listItem.html';
            },
            /*'templates/listItem.html',*/
            replace : false,
            scope : {
                icon :'=',
                itemName : '=',
                itemDesc : '=',
                height : '=',
                iconColor :'=',
                descFontSize:'=',
                descFontColor:'='
            },
            link:function (scope,ele) {
                if(scope.height){
                    ele.find('ons-list-item').css({"height" : scope.height});
                    ele.find('ons-row').css({"height" : scope.height});
                }
                else{
                    scope.height = '40px';
                    ele.find('ons-list-item').css({"height" : scope.height});
                    ele.find('ons-row').css({"height" : scope.height});
                }

                if(scope.iconColor){
                    $(ele).find('.item-icon').css('color',scope.iconColor);


                }
                if(scope.descFontSize){
                    $(ele).find('.item-desc ').css('font-size',scope.descFontSize);
                }
                /*为什么没用？*/
                if(scope.descFontColor){
                    $(ele).find('.item-desc ').css({'color':scope.descFontColor});
                }
            }
        }
    })
    .directive('limitArea',function () {
        return{
            restrict : 'E',
            templateUrl : 'templates/limitArea.html',
            scope : {
                text : '=',
                limitNum : '=',
                rows :'=',
                placeholder : '='
            },
            link : function (scope,ele,attrs) {

                scope.restWord = scope.limitNum;
                scope.inputChange = function () {
                    if(scope.text.length>scope.limitNum){
                        scope.text = scope.text.substr(0,scope.limitNum);
                        scope.restWord = 0;
                    }
                    else{
                        scope.restWord = scope.limitNum - scope.text.length;
                    }
                }
                if(scope.rows){
                    ele.find('textarea').attr('rows',scope.rows);
                }
                if(scope.placeholder){
                    ele.find('textarea').attr('placeholder',scope.placeholder);
                }
            }

        }

    })
    .directive('mySearchInput',function () {
       return{
           restrict : "E",
           templateUrl : 'templates/searchInput.html',
           scope : {
               model : '=' ,
               height : '=',
               width : '='
           },
           link : function (scope,ele,attrs) {
               if(scope.height){
                   console.log(ele.find('div'));
                   ele.find('div').css('line-height',scope.height)
               }
               if(scope.width){
                   ele.find('div').css('width',scope.width)
               }
           }
       }
    })
/*
.directive('myIconListItem',function () {
    return{
        restrict : 'EA',
        templateUrl: 'templates/iconListItem.html',
        replace : false,
        scope : {
            icon : '=',
            itemName : '=',
            itemDesc : '=',
            height : '='
        },
        link:function (scope,ele) {

            if(scope.height){
                ele.find('ons-list-item').css({"height" : scope.height});
                ele.find('ons-row').css({"height" : scope.height});
            }
            else{
                scope.height='40px';
            }
        }
    }

})*/

;
/*选择重要性*/
/*
app.directive('rank-select',function () {
    return{
        scope : {
            ranks : "=",
            selectedRank :"=",
            select : "&"
        },
        restrict : 'E',
        templateUrl : 'templates/rankSelect.html',
        replace : true,
        link : function (scope,elem,attr) {

        }
    }
});*/
