'use strict';

snow.directive('shoppingDir',['userFactory','$http','$rootScope',function(userFactory,$http,$rootScope){
    return {
        scope:true,
        link:function(scope){
            scope.shoppingNum = refreshCount();

            $rootScope.$on('updateCart',function(){
                refreshCount();
            });

            function refreshCount(){
                userFactory.getUser().then(function(success){
                    scope.shoppingNum = success.data.orders.length;
                }).catch(function(){//user is not logged in
                    scope.shoppingNum = 0;
                });
            }
        }
    };
}]);