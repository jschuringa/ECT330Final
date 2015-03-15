'use strict';

snow.factory('userFactory',['$http','$rootScope',function($http,$rootScope){
    return {
        getUser:getUser,
        saveAuth:saveAuth,
        updateUser:updateUser
    };

    function saveAuth(username,password){
        localStorage.setItem('auth','Basic ' + window.btoa(username + ':' + password));
    }

    function getUser(){
        return $http.get('/api/customer').then(function(success){
            $rootScope.name = success.data.firstName + ' ' + success.data.lastName;
            return success;
        });
    }

    function updateUser(){
        localStorage.setItem('user',JSON.stringify(user));
    }
}]);