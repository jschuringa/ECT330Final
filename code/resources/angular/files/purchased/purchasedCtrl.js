'use strict';

snow.controller('purchasedCtrl',['$http','$location','$q','$scope','userFactory',function($http,$location,$q,$scope,userFactory){
    var status = $location.search().StatusCode;
    $location.search({});

    if(status === 'A'){
        $scope.success = true;
        userFactory.getUser().then(function(success){
            var orders = success.data.orders;
            var promises = [];

            orders.forEach(function(order){
                promises.push($http.delete('/api/order/' + order.orderID));
            });

            $q.all(promises).then(function(){
                $scope.$emit('updateCart');
            });
        });
    }
}]);