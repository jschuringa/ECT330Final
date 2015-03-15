'use strict';

snow.factory('authInterceptor',[function(){
    return {
        'request':function(config){
            if(config.headers.Authorization === undefined){//headers aren't set
                config.headers.Authorization = localStorage.getItem('auth');
            }

            return config;
        }
    }
}]);

snow.config(['$httpProvider',function($httpProvider){
    $httpProvider.interceptors.push('authInterceptor');
}]);