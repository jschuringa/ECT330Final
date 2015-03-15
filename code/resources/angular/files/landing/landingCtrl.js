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

    $scope.get = function(chosen){
        if($scope.num > 0){
            $http.post('/shoppingCart',chosen).then(function(){
                //successfully added
                $scope.close();
                $scope.$emit('updateCart');
                //TODO Add shopping cart functionality;
            }).catch(function(err){
                if(err.status){
                    $window.alert('Couldn\'t reach the server. Please try again');
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