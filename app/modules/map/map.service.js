(function() {
    'use strict';
    angular.module('angular-movmovit-map', []);
    
    angular.module('angular-movmovit-map').service('mapBoxMovmovit', mapBoxMovmovit);

    function mapBoxMovmovit() {
        var service = {
            notify: notify
        };

        return service;

        function notify(msg) {
    		return alert(msg);
        }
    }
})();