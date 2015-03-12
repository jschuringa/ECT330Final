'use strict';

snow.directive('highlightDir',[function(){
    return {
        link:function(scope,element){
            element.mouseenter(function(){
                element.addClass('bg-info')
            });

            element.mouseleave(function(){
                element.removeClass('bg-info');
            })
        }
    };
}]);