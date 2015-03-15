'use strict';

snow.factory('userFactory',['$rootScope',function($rootScope){
    var user;

    return {
        getUser:getUser,
        setUser:setUser
    };

    function getUser(){
        if(user !== undefined){
            return user;
        }else{
            user = localStorage.getItem('user');

            if(user.length !== 0){
                user = JSON.parse(user);
            }

            return user;
        }
    }

    function setUser(inUser){
        user = inUser;
        localStorage.setItem('user',JSON.stringify(inUser));
        $rootScope.name = user.firstName + ' ' + user.lastName;
    }
}]);