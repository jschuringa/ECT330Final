'use strict';

snow.directive('highlightDir',[function(){
    return {
        scope:false,
        link:function(scope,element,attr){
            element.mouseenter(function(){
                element.addClass('bg-info')
            });

            element.mouseleave(function(){
                element.removeClass('bg-info');
            });

            element.click(function(){
                scope.$emit('clicked',scope.item);
            });
        }
    };
}]);