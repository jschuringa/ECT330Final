'use strict';

snow.factory('userFactory',['$rootScope',function($rootScope){
    var user;

    return {
        setUser:setUser
    };

    function setUser(user){
        this.user = user;
        $rootScope.name = user.name;
    }
}]);