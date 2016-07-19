var scriptsUrl = 'http://localhost:4848/extensions/angularTemplate/';
/* 
* DEPENDANCIES for Sense 2.2.3 - Angular 1.2.15, Bootstrap 3.1.1, jQuery  2.1.3?
* DEPENDANCIES for Sense 3.0 - Angular 1.5.0, Bootstrap 3.3.6, jQuery  2.1.3
*/
require.config({
  baseUrl: "http://localhost:4848/resources",
  paths: {
  	'domReady': scriptsUrl +'js/vendor/domReady/domReady',
	'bootstrap': scriptsUrl + 'js/vendor/bootstrap/dist/js/bootstrap.min',
	'app': scriptsUrl + 'js/lib/app',
	'ga': scriptsUrl + 'js/lib/ga',
    'controller.home': scriptsUrl + 'js/controllers/home',
    'directive.getObject': scriptsUrl + 'js/directives/getObject',
    'directive.dropDown': scriptsUrl + 'js/directives/dropDown',
    'directive.exportToCsv': scriptsUrl + 'js/directives/exportToCsv',
    'directive.visualization': scriptsUrl + 'js/directives/visualization',
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

    // define( "client.services/grid-service", {} );
	app.obj.angularApp = angular.module('myApp', [
		'ngAnimate',
		'ngRoute',
	]);
	app.obj.angularApp.config(function($routeProvider,$locationProvider) {
		$routeProvider
			.when('/', { 
				templateUrl: scriptsUrl+"views/home.html",
				controller: 'controller.home' 
			} )
			.otherwise({redirectTo: '/'})
	})
    require([
    	'domReady!', 
    	'js/qlik',
    	'angular',
        'ga',
    	'controller.home',
    	'service.api',
    	'service.utility',
        'directive.getObject',
    	'directive.dropDown',
    	'directive.exportToCsv',
        'directive.visualization',
    	'bootstrap',
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
