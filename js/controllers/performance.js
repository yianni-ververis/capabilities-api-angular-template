'use strict';

/**
 * @ngdoc function
 * @name friluftsframjandetApp.controller:controller.dashboard
 * @author yianni.ververis@qlik.com
 * @description
 * # controller.dashboard
 * Controller of the myApp
 */
app.obj.angularApp
	.controller('controller.performance', function ($scope, $rootScope, $location, $injector, api, utility) {
		var me = {};

		me.init = function () {
			$rootScope.page = 2;
			$rootScope.title = 'Performance';
			me.objects = ['uETyGUP'];
		}
		
		me.boot = function () {
			me.init();
			
			me.events();
			me.getObjects();

			utility.log('Page loaded: ', $scope.page);
		};

		me.events = function () {
			me.getObjects = function () {
				api.getObjects(me.objects);
			}
			// Clear current scope's function
			$rootScope.clearAllController = function () {
				// 
			}
			$rootScope.goTo = function(page) {
				api.destroyObjects().then(function(){
					$location.url('/' + page);
				});
			}
		}

		me.boot();
	});
