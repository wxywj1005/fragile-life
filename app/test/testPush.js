app.controller('DemoController', function($scope, $timeout, $http) {
    $scope.items = [];
    $scope.load = function($done) {
        $timeout(function() {
            $http.jsonp('http://numbersapi.com/random/year?callback=JSON_CALLBACK')
                .success(function(data) {
                    $scope.items.unshift({
                        desc: data,
                        rand: Math.random()
                    });
                })
                .error(function() {
                    $scope.items.unshift({
                        desc: 'No data',
                        rand: Math.random()
                    });
                })
                .finally(function() {
                    $done();
                });
        }, 1000);
    };
    $scope.reset = function() {
        $scope.items.length = 0;
    }
});