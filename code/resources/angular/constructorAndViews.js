'use strict';

var snow = angular.module("snow",['ngRoute']);

snow.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'/resources/angular/files/landing/landing.html',
        controller:'landingCtrl'
    }).when('/information',{
        templateUrl:'/resources/angular/files/information/information.html'
    }).otherwise('/');
}]);