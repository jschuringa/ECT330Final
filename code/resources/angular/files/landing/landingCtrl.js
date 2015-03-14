'use strict';

snow.controller('landingCtrl',['$http','$scope','$window',function($http,$scope,$window){
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
        if($scope.num <= $scope.chosen.quantity && $scope.num > 0){
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
            if($scope.num > $scope.chosen.quantity){
                var number = $scope.chosen.quantity;
                var title = $scope.chosen.title;

                $window.alert('There are only ' + number + ' of ' + title + ' available.');
            }else if($scope.num <= 0){
                $window.alert('Must at least request 1 item');
            }
        }

    };
    
    $http.get('/testItems').then(function(success){
        $scope.items = success.data;
    }).catch(function(err){
        if(err.status){
            $window.alert('Couldn\'t reach the server. Please try again');
        }else{
            $window.alert('Something went wrong while trying to load the items. Please try again.');
        }
    });
}]);