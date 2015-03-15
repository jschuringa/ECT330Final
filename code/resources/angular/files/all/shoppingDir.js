'use strict';

snow.directive('shoppingDir',['userFactory','$http','$rootScope',function(userFactory,$http,$rootScope){
    return {
        scope:true,
        link:function(scope){
            scope.shoppingNum = refreshCount();

            $rootScope.$on('updateCart',function(){
                scope.shoppingNum = refreshCount();
            });

            function refreshCount(){
                var user = userFactory.getUser();

                if(user !== null){
                    return user.orders.length;
                }else{
                    return 0;
                }
            }
        }
    };
}]);