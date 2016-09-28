app.controller('orderController', ['$scope', '$rootScope', '$http', '$timeout', 'ngDialog', '$location', '$window', 'myConfig', '$interval',
    function($scope, $rootScope, $http, $timeout, ngDialog, $location, $window, myConfig, $interval) {
        $scope.showMap = true;
        $scope.pageInfo = [{
            "title": "Pedidos"
        }];
        $scope.showDialog = function($page) {
            $scope.insidePage = $page;
            ngDialog.open({
                template: myConfig.paths.pages + 'order/order-scene.html',
                className: 'wrapper-modal order-scene ' + $page,
                scope: $scope
            });
        };
        $scope.displayList = function (act){
            $scope.showMap = act == 'map' ? true : false;
            $scope.modalBusy = true;
            $timeout(function(){
                $scope.modalBusy = false;
            }, 1000);
        };

        $scope.newOrderRequest = function() {
            ngDialog.open({
                template: myConfig.paths.pages + 'order/order-new-request.html',
                className: 'wrapper-modal order-new-request'
            });
        };
        $scope.includePage = function() {
            return myConfig.paths.pages + 'order/' + $scope.insidePage + '.html';
        };
        $scope.hideShadow = false;
        $scope.callDriver = function($driverID) {
            $scope.callingDriver = true;
        }
    }
]);