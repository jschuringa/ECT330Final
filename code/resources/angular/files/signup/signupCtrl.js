'use strict';

snow.controller('signupCtrl',['$scope',function($scope){
    $scope.register = function(){
        if($scope.registrationForm.$valid){

        }
    };

    $scope.$watch('password + password2',function(){//makes sure passwords match
        if($scope.password !== $scope.password2){
            $scope.registrationForm.password2.$setValidity('Passwords match',false);
        }else{
            $scope.registrationForm.password2.$setValidity('Passwords match',true);
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