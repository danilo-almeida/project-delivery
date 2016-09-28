app.config(function ($routeProvider, $locationProvider) {
    var appRoutes = {
        components: "pages/"
    };
    $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
    });
    $routeProvider
        .when('/', {
            title: 'Login',
            templateUrl: appRoutes.components + 'login/login.html',
            controller: "loginController"
        })
        .when('/pagina-nao-encontra', {
            title: 'Pagina não encontrada',
            templateUrl: appRoutes.components + 'not-found/not-found.html'
        })
        .when('/pedidos', {
            title: 'Pedidos',
            templateUrl: appRoutes.components + 'order/order-list.html',
            controller: "orderController"
        })
        .otherwise({
            redirectTo: '/pagina-nao-encontra'
        });
})

    .run(function ($rootScope) {
        $rootScope.hasAuth = true;
    });