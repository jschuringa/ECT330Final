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
    }).when('/signup',{
        templateUrl:root + '/signup/signup.html',
        controller:'signupCtrl'
    }).when('/checkout',{
        templateUrl:root + '/checkout/checkout.html',
        controller:'checkoutCtrl'
    }).when('/purchased',{
        templateUrl:root + '/purchased/purchased.html',
        controller:'purchasedCtrl',
        reloadOnSearch:false
    }).otherwise('/');
}]);