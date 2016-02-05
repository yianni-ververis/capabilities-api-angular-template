'use strict';

/**
 * @ngdoc function
 * @name myApp.controller: Header
 * @description
 * # controller.header
 * Global Controller of the myApp
 */
app.obj.angularApp
	.controller('controller.header', function ($scope, $rootScope, api, utility) {
		var me = {};

		me.init = function () {
			$scope.objects = ['ycppXj'];
		};

		me.boot = function () {
			me.init();
			me.events();
			utility.log('Header loaded:', 'Success!');
		}

		me.events = function () {
			$rootScope.clearAll = function () {
				app.obj.app.clearAll();
				// Custom init for clearAll in the main controller
				$rootScope.clearAllController();
			}
		};

		me.boot();
	});
