'use strict';

snow.controller('loginCtrl',['$http','$location','$scope','userFactory','$window',function($http,$location,$scope,userFactory,$window){
    $scope.login = function(){
        if($scope.loginForm.$valid){
            var data = {user:$scope.user,password:$scope.password};

            $http.post('/login',data).then(function(){
                //successfully logged in
                userFactory.setUser({name:'test user'});
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