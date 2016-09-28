'use strict';
var app = angular.module('app',
    [
        'ngRoute',
        'ngAnimate',
        'ngCookies',
        'angular-loading-bar',
        'ngResource',
        'ngMask',
        'ngAria',
        'ngDialog',
        'ngMaterial',
        'ngDialog',
        'ngCpfCnpj',
        'datePicker',
        'satellizer',
        'ngCurrencyMask',
        'google.places',
        'ngTinyScrollbar',
        'angular-movmovit-map'
    ]);

app.directive('iconFill', function () {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            var object = angular.element(element[0].children[0]);
            /** @namespace attr.iconFill */
            if(angular.isDefined(attr.iconFill)) {
                object.load(function () {
                    var svg = angular.element(this.getSVGDocument().documentElement);
                    svg.attr('fill', attr.iconFill);
                });
            }
        }
    };
});