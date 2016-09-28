app.controller('headerController', ['$scope', '$rootScope', '$http', '$timeout', 'ngDialog', '$location',
    function($scope, $rootScope, $http, $timeout, ngDialog, $location) {
        $scope.isVisible = false;
        $scope.displayFilter = function() {
            $scope.isVisible = (!$scope.isVisible) ? true : false;
        };
        $scope.isSelectOpened = false;
        $scope.showSelectBox = function() {
            $scope.isSelectOpened = $scope.isSelectOpened ? false : true;
            $scope.showOptions = false;
        };
        $scope.showOptions = false;
        $scope.openedOptions = function() {
            $scope.showOptions = $scope.showOptions ? false : true;
        };
        $scope.showCalendar = false;
        $scope.textOption = 'Ultima semana';
        $scope.idSelect = 'lastWeek';
        $scope.selectDate = function($id) {
            var $element = angular.element('#' + $id),
                $clone = $element.clone();
            $scope.textOption = $element.text();
            $scope.showCalendar = ($id == 'date') ? true : false;
            $scope.idSelect = $id;
        };
        $scope.dateRange = '';
    }
]);