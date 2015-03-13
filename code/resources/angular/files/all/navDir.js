'use strict';

snow.directive('navDir',['$location',function($location){
    return {
        link:function(scope,element,attr){
            element.click(function(){
                $location.path(attr.navDir);
                if(!scope.$$phase){
                    scope.$apply();
                }
            });
        }
    };
}]);