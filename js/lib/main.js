var scriptsUrl = 'http://localhost:4848/extensions/angularTemplate/';

require.config({
  baseUrl: "http://localhost:4848/resources",
  paths: {
  	'domReady': scriptsUrl +'js/vendor/domReady/domReady',
	'bootstrap': scriptsUrl + 'js/vendor/bootstrap/dist/js/bootstrap.min',
	'd3': scriptsUrl + 'js/vendor/d3/d3.min',
	'ui.bootstrap': scriptsUrl + 'js/vendor/angular-bootstrap/ui-bootstrap-tpls.min',
	'app': scriptsUrl + 'js/lib/app',
    'controller.dashboard': scriptsUrl + 'js/controllers/dashboard',
    'controller.performance': scriptsUrl + 'js/controllers/performance',
    'controller.header': scriptsUrl + 'js/controllers/header',
    'controller.d3': scriptsUrl + 'js/controllers/d3',
    'directive.getObject': scriptsUrl + 'js/directives/getObject',
    'directive.exportToCsv': scriptsUrl + 'js/directives/exportToCsv',
	'service.api': scriptsUrl + 'js/services/api',
	'service.utility': scriptsUrl + 'js/services/utilities'
  }
});

define([
    'require',
    'angular',
    'app'
], function (require, angular) {
    'use strict';

    define( "client.services/grid-service", {} );
	app.obj.angularApp = angular.module('myApp', [
		'ngAnimate',
		'ngRoute',
		'ui.bootstrap'
	]);
	app.obj.angularApp.config(function($routeProvider,$locationProvider) {
		$routeProvider
			.when('/', { 
				templateUrl: scriptsUrl+"views/dashboard.html",
				controller: 'controller.dashboard' 
			} )
			.when('/performance', { 
				templateUrl: scriptsUrl+"views/performance.html",
				controller: 'controller.performance' 
			} )
			.when('/d3', { 
				templateUrl: scriptsUrl+"views/d3.html",
				controller: 'controller.d3' 
			} )
			.otherwise({redirectTo: '/'})
		// $locationProvider.html5Mode({ enabled: true, requireBase: true });
	})
    require([
    	'domReady!', 
    	'js/qlik',
    	'angular',
    	'd3', 
    	'controller.dashboard',
    	'controller.performance',
    	'controller.header',
    	'controller.d3',
    	'service.api',
    	'service.utility',
    	'directive.getObject',
    	'directive.exportToCsv',
    	'bootstrap',
    	'angular-animate',
    	'ui.bootstrap'
    ], function (document, qlik) {
    	app.obj.qlik = qlik;
		qlik.setOnError( function ( error ) {
			if (!angular.isUndefined(error) && error.code == 16) {
				location.reload();
			} else {
				console.log(error);
			}
		} );

        angular.bootstrap( document, ["myApp", "qlik-angular"] );

        app.boot();
    });
});
