'use strict';

snow.controller('checkoutCtrl',['userFactory','$http','$scope','$window',function(userFactory,$http,$scope,$window){
    $scope.total = 0;
    refreshOrders();


    $scope.remove = function(item){
        console.log(item);
        $http.delete('/api/order/' + item.orderID).then(function(){
            $scope.$emit('updateCart');
            refreshOrders();
        });
    };

    $scope.buy = function(){

    };

    function refreshOrders(){
        userFactory.getUser().then(function(success){
            $scope.shoppingItems = success.data.orders;

            $scope.shoppingItems.forEach(function(item){
                $scope.total += item.items.itemPrice * item.itemQTY;
            });
        });
    }
}]);