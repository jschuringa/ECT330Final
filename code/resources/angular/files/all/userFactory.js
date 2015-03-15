'use strict';

snow.factory('userFactory',['$rootScope',function($rootScope){
    var user = localStorage.getItem('user');

    if(user !== null && user.length !== 0){
        user = JSON.parse(user);
        $rootScope.name = user.firstName + ' ' + user.lastName;
    }

    return {
        getAuth:getAuth,
        getUser:getUser,
        setUser:setUser
    };

    function getAuth(){
        if(user !== null){
            return 'Basic ' + window.btoa(user.username + ':' + user.password);
        }else{
            return null;
        }

    }

    function getUser(){
        return user;
    }

    function setUser(inUser){
        user = inUser;
        localStorage.setItem('user',JSON.stringify(inUser));
        $rootScope.name = user.firstName + ' ' + user.lastName;
    }
}]);