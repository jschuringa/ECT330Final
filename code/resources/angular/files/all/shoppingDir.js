'use strict';

snow.directive('shoppingDir',['$http','$rootScope',function($http,$rootScope){
    return {
        scope:true,
        link:function(scope){
            scope.shoppingNum = 0;
            refreshCount();

            $rootScope.$on('updateCart',function(){
                refreshCount();
            });

            function refreshCount(){
                $http.get('/shoppingCart').then(function(success){
                    scope.shoppingNum = success.data.length;
                });
            }
        }
    };
}]);