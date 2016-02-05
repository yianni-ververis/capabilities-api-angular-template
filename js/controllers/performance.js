'use strict';

/**
 * @ngdoc function
 * @name friluftsframjandetApp.controller:controller.dashboard
 * @description
 * # controller.dashboard
 * Controller of the friluftsframjandetApp
 */
app.obj.angularApp
	.controller('controller.performance', function ($scope, $rootScope, $location, $injector, api, utility) {
		var me = {};

		me.init = function () {
			$rootScope.page = 2;
			$rootScope.title = 'Performance';
			$scope.objects = ['uETyGUP'];
		}
		
		me.boot = function () {
			me.init();
			
			me.events();

			utility.log('Page loaded: ', $scope.page);
		};

		me.events = function () {
			// Clear current scope's function
			$rootScope.clearAllController = function () {
				// 
			}
			$rootScope.goTo = function(page) {
				$location.url('/' + page);	
			}
		}

		me.boot();
	});
