'use strict';

snow.controller('signupCtrl',['$http','$location','$scope','userFactory','$window',function($http,$location,$scope,userFactory,$window){
    $scope.register = function(){
        if($scope.registrationForm.$valid){
            var data = {
                firstName:$scope.fname,
                lastName:$scope.lname,
                username:$scope.username,
                password:$scope.password
            };

            $http.post('/api/customer',data).then(function(success){
                userFactory.setUser(success.data);

                data = {
                    addressLine1:$scope.address,
                    addressLine2:$scope.unit,
                    city:$scope.city,
                    state:$scope.state,
                    zipcode:$scope.zip
                };

                return $http.post('/api/address',data);
            }).then(function(){
                $window.alert('Successfully signed up!');
                $location.path('/');
            }).catch(function(err){
                if(err.status === 404){
                    $window.alert('Server couldn\'t be reached. Please try again at a later time');
                }else{
                    $window.alert('Something went wrong');
                }
            });
        }
    };

    $scope.$watch('password + password2',function(){//makes sure passwords match
        if($scope.password !== $scope.password2){
            $scope.registrationForm.password2.$setValidity('Passwords match',false);
        }else{
            $scope.registrationForm.password2.$setValidity('Passwords match',true);
        }
    });

    $scope.$watch('password',function(){
        if($scope.password !== undefined){
            var nonAlphaNumeric = $scope.password.replace(/[\dA-Za-z]/g,'');//filters out numbers and alphabetic characters

            if(nonAlphaNumeric.length === 0){
                $scope.registrationForm.password.$setValidity('Password doesn\'t meet criteria',false);
            }else{
                if($scope.password.length >= 8){
                    $scope.registrationForm.password.$setValidity('Password doesn\'t meet criteria',true);
                }
            }
        }
    });
}]);