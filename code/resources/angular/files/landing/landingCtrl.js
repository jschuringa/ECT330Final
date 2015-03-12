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
        $http.post('/shoppingCart',chosen).then(function(){
            //successfully added
            $scope.close();
            //TODO Add shopping cart functionality;
        }).catch(function(err){
            if(err.status){
                $window.alert('Couldn\'t reach the server. Please try again');
            }else{
                $window.alert('Something went wrong while trying to add item to your shopping cart. Please try again');
            }
        });
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