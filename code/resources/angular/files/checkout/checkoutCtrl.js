'use strict';

snow.controller('checkoutCtrl',['userFactory','$http','$scope','$window',function(userFactory,$http,$scope,$window){
    refreshOrders();


    $scope.remove = function(item){
        $http.delete('/api/order/' + item.orderID).then(function(){
            $scope.$emit('updateCart');
            refreshOrders();
        });
    };

    $scope.buy = function(){
        var data = '=9000;' + $scope.total;

        $http.post('/api/payment',data,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then(function(success){
            console.log(success.data);
            var hash = success.data;

            //Create the URL and concatenate the Query String values
            var url = "http://ectweb2.cs.depaul.edu/ECTCreditGateway/Authorize.aspx" ;
            url = url + "?AppId="+ 43;
            url = url + "&TransId=" + 9000;
            url = url + "&AppTransAmount=" + $scope.total;
            url = url + "&AppHash=" + hash;

            console.log(url);

            //window.location.href = url;//redirects the user
        }).catch(function(err){
            if(err.status === 404){
                $window.alert('Server is unavailable');
            }else if(err.status === 401){
                $window.alert('You must be logged in');
            }else{
                $window.alert('Something went wrong');
            }
        });
    };

    function refreshOrders(){
        userFactory.getUser().then(function(success){
            $scope.total = 0;
            $scope.shoppingItems = success.data.orders;

            if($scope.address === undefined){//loads up shipping address, and allow them to change it
                $scope.address = success.data.addresses[0];
            }

            $scope.shoppingItems.forEach(function(item){
                $scope.total += item.items.itemPrice * item.itemQTY;
            });
        });
    }
}]);