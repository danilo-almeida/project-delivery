app.controller('loginController',
    [
        '$scope',
        '$rootScope',
        '$http',
        '$timeout',
        '$location',
        '$auth',
        function (
            $scope,
            $rootScope,
            $http,
            $timeout,
            $location,
            $auth
        ) {
            $scope.pageInfo = [
                {
                    "title": "Login"
                }
            ];
            $rootScope.isAuthenticated = function () {
                return $auth.isAuthenticated();
            };

            $scope.busy = false;

            $scope.auth = function () {

                window.location = "#/pedidos";
                $scope.busy = true;
                $auth.login($scope.user);
                $timeout(function () {
                    console.log($auth.isAuthenticated());
                    $scope.busy = false;
                }, 2000);
                //$location.url('/pedidos');
            };

            $scope.logout = function () {
                $auth.logout();
            };

            $scope.isForgotPass = false;
            $scope.forgotPassword = function () {
                $scope.isForgotPass = true;
            };

            $scope.sendPassword = function () {
                $scope.busy = true;
                //$scope.sendSuccess = true;
            };

            $scope.backLogin = function () {
                $scope.isForgotPass = false;
            }
        }]);