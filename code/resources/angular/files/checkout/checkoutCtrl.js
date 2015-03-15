'use strict';

snow.controller('checkoutCtrl',['userFactory','$http','$scope','$window',function(userFactory,$http,$scope,$window){
    $scope.total = 0;

    $scope.shoppingItems = userFactory.getUser().orders;

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