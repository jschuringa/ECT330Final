'use strict';

snow.controller('loginCtrl',['$http','$location','$scope','userFactory','$window',function($http,$location,$scope,userFactory,$window){
    $scope.login = function(){
        if($scope.loginForm.$valid){
            var data = 'Basic ' + window.btoa($scope.user + ':' + $scope.password);
            var authHeader = {headers:{Authorization:data}};

            localStorage.removeItem('user');//removes previous user on login attempt

            $http.get('/api/customer',authHeader).then(function(success){
                //successfully logged in
                userFactory.setUser(success.data);
                $location.path('/');
            }).catch(function(err){
                if(err.status == 404){
                    $window.alert('Server cannot be reached');
                }else if(err.status == 401){
                    $window.alert('Incorrect login/password');
                }else{
                    $window.alert('Unknown error has occured');
                }
            });
        }
    };
}]);