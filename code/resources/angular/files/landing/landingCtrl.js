'use strict';

snow.controller('landingCtrl',['$http','$scope','$window',function($http,$scope,$window){
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