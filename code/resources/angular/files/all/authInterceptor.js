'use strict';

snow.factory('authInterceptor',['userFactory',function(userFactory){
    return {
        'request':function(config){
            if(config.headers.Authorization === undefined){//headers aren't set
                config.headers.Authorization = userFactory.getAuth();
            }

            return config;
        }
    }
}]);

snow.config(['$httpProvider',function($httpProvider){
    $httpProvider.interceptors.push('authInterceptor');
}]);