'use strict';

/**
 * @ngdoc function
 * @name myApp.controller: Header
 * @author yianni.ververis@qlik.com
 * @description
 * # controller.header
 * Global Controller of the myApp
 */
app.obj.angularApp
	.controller('controller.header', function ($scope, $rootScope, api, utility) {
		var me = {};

		me.init = function () {
			me.objects = ['ycppXj'];
		};

		me.boot = function () {
			me.init();
			me.events();
			me.getObjects();
			utility.log('Header loaded:', 'Success!');
		}

		me.events = function () {
			me.getObjects = function () {
				api.getObjects(me.objects);
			}
			$rootScope.clearAll = function () {
console.log(1)
				app.obj.app.clearAll();
				// Custom init for clearAll in the main controller
				$rootScope.clearAllController();
			}
		};

		me.boot();
	});
