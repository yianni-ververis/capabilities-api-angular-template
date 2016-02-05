/*jshint unused: vars */
var scriptsUrl = 'http://localhost/templateAngular/';

require.config({
  baseUrl: "http://localhost:4848/resources",
  paths: {
  	'domReady': scriptsUrl +'js/vendor/domReady/domReady',
	'bootstrap': scriptsUrl + 'js/vendor/bootstrap/dist/js/bootstrap.min',
	'ui.bootstrap': scriptsUrl + 'js/vendor/angular-bootstrap/ui-bootstrap-tpls.min',
	'ui.router': scriptsUrl + 'js/vendor/angular-ui-router/release/angular-ui-router.min',
	'app': scriptsUrl + 'js/lib/app',
    'controller.dashboard': scriptsUrl + 'js/controllers/dashboard',
    'controller.header': scriptsUrl + 'js/controllers/header',
    'directive.getObject': scriptsUrl + 'js/directives/getObject',
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
		'ui.router',
		'ui.bootstrap'
	]);
	app.obj.angularApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/dashboard");
		$stateProvider
	    .state('dashboard', {
			url: "/dashboard",
	    	views: {
				'header': { 
					templateUrl: "views/header.html",
					controller: 'controller.header' 
				},
				'main': { 
					templateUrl: "views/dashboard.html",
					controller: 'controller.dashboard' 
				},
			}
	    })
	});
    require([
    	'domReady!', 
    	'js/qlik',
    	'angular',
    	'controller.dashboard',
    	'controller.header',
    	'service.api',
    	'service.utility',
    	'directive.getObject',
    	'bootstrap',
    	'angular-animate',
    	'ui.bootstrap',
    	'ui.router'
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
