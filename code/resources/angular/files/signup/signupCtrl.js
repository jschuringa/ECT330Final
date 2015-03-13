'use strict';

snow.controller('signupCtrl',['$http','$location','$scope','$window',function($http,$location,$scope,$window){
    $scope.register = function(){
        if($scope.registrationForm.$valid){
            var data = {
                fname:$scope.fname,
                lname:$scope.lname,
                email:$scope.email,
                password:$scope.password,
                phone:$scope.phone
            };

            $http.post('/users',data).then(function(){
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

    $scope.$watch('phone',function(){
        if($scope.phone !== undefined){
            $scope.phone = $scope.phone.replace(/[^-0-9]/g,'');//only allows digits and '-'

            if($scope.phone.length < 10){
                $scope.registrationForm.phone.$setValidity('Bad Phone Length',false);//Done manually to allow above code to run on short entries
            }else{
                $scope.registrationForm.phone.$setValidity('Bad Phone Length',true);
            }
        }
    });
}]);