'use strict';

snow.controller('checkoutCtrl',['$http','$scope','$window',function($http,$scope,$window){
    $scope.total = 0;

    $http.get('/testItems').then(function(success){//will be items from shopping cart
        $scope.shoppingItems = success.data;

        $scope.shoppingItems.forEach(function(item){
            $scope.$watch(function(){
                return item.get;
            },function(){
                if(item.get){
                    $scope.total += item.price * item.quantity;
                }else{
                    if($scope.total > 0) $scope.total -= item.price * item.quantity;
                }
            });
        });
    });

    $scope.all = function(){
        $scope.shoppingItems.forEach(function(item){
            item.get = true;
        });
    };

    $scope.none = function(){
        $scope.shoppingItems.forEach(function(item){
            item.get = false;
        });
    };

    $scope.buy = function(){
        if($scope.shoppingItems.some(function(item){return item.get})){
            console.log('selected');
            //TODO: Purchase item
        }else{
            $window.alert('Please select at least 1 item to buy');
        }
    }
}]);