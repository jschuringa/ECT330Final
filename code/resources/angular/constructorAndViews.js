'use strict';

var snow = angular.module("snow",['ngRoute']);

snow.config(['$routeProvider',function($routeProvider){
    var root = '/resources/angular/files';

    $routeProvider.when('/',{
        templateUrl:root + '/landing/landing.html',
        controller:'landingCtrl'
    }).when('/information',{
        templateUrl:root + '/information/information.html'
    }).when('/login',{
        templateUrl:root + '/login/login.html',
        controller:'loginCtrl'
    }).otherwise('/');
}]);