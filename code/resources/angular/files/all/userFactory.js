'use strict';

snow.factory('userFactory',['$rootScope',function($rootScope){
    var user = localStorage.getItem('user');

    if(user.length !== 0){
        user = JSON.parse(user);
    }

    $rootScope.name = user.firstName + ' ' + user.lastName;

    return {
        getAuth:getAuth,
        getUser:getUser,
        setUser:setUser
    };

    function getAuth(){
        return 'Basic ' + window.btoa(user.username + ':' + user.password);
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