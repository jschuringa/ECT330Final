'use strict';

snow.controller('purchasedCtrl',['$location','$scope',function($location,$scope){
    console.log($location.search());
    var status = $location.search().StatusCode;
    $location.search({});

    if(status === 'A'){
        $scope.success = true;
    }
}]);