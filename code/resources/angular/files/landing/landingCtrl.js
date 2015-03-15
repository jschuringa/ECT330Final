'use strict';

snow.controller('landingCtrl',['userFactory','$http','$scope','$window',function(userFactory,$http,$scope,$window){
    $scope.$on('clicked',function(event,item){
        $scope.showModal = true;
        $scope.chosen = item;
        if(!$scope.$$phase){
            $scope.$apply();//lets angular know something changed
        }
    });

    $scope.close = function(){
        $scope.showModal = false;
        $scope.chosen = null;
    };

    $scope.get = function(){
        if($scope.num > 0){
            var data = {
                itemId:$scope.chosen.itemID,
                orderDate:new Date().toISOString().slice(0, 19).replace('T', ' '),
                itemQTY:$scope.num
            };

            $http.post('/api/order',data).then(function(){
                //successfully added
                $scope.close();
                $scope.$emit('updateCart');
                $scope.num = 1;//reset quantity
                //TODO Add shopping cart functionality;
            }).catch(function(err){
                if(err.status){
                    $window.alert('Couldn\'t reach the server. Please try again');
                }else if(err.status === 401){
                    $window.alert('You have to be logged in to place an order');
                }else{
                    $window.alert('Something went wrong while trying to add item to your shopping cart. Please try again');
                }
            });
        }else{
            $window.alert('Must at least request 1 item');
        }

    };
    
    $http.get('/api/item').then(function(success){
        $scope.items = success.data;
    }).catch(function(err){
        if(err.status){
            $window.alert('Couldn\'t reach the server. Please try again');
        }else{
            $window.alert('Something went wrong while trying to load the items. Please try again.');
        }
    });
}]);