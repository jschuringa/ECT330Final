'use strict';

snow.controller('checkoutCtrl',['userFactory','$http','$scope','$window',function(userFactory,$http,$scope,$window){
    $scope.total = 0;

    userFactory.getUser().then(function(success){
        $scope.shoppingItems = success.data.orders;

        $scope.shoppingItems.forEach(function(item){
            $scope.total += item.items.itemPrice * item.itemQTY;
        });
    });

    $scope.buy = function(){
        if($scope.shoppingItems.some(function(item){return item.get})){
            console.log('selected');
            //TODO: Purchase item
        }else{
            $window.alert('Please select at least 1 item to buy');
        }
    }
}]);