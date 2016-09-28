app.config([
    'ngDialogProvider',
    '$maskerProvider',
    function (
        ngDialogProvider,
        $maskerProvider
    ) {
    ngDialogProvider.setDefaults({
        className: 'ngdialog-theme-default dialog',
        showClose: true,
        closeByDocument: true,
        closeByEscape: true
    });

    $maskerProvider.setCurrency('BRL');

    // Auth
    //$authProvider.loginUrl = '/auth/login';

}]);
app.constant("myConfig", {
    "url": "http://localhost",
    "port": "80",
    "paths": {
        'pages' : './pages/',
        'modules' : './modules/',
        'shared' : './shared/'
    }
});

app.run(function ($rootScope, $timeout, $cookies, ngDialog) {

    $rootScope.page = {
        setTitle: function (title) {
            this.title = ' - ' + title;
        }
    };

    $rootScope.bodyClass = {
        setClass: function (title) {
            this.name = title;
        }
    };

    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.page.setTitle(current.$$route.title || 'Default Title');
    });
});
