'use strict';

/**
 * @ngdoc function
 * @name friluftsframjandetApp.controller:controller.dashboard
 * @description
 * # controller.dashboard
 * Controller of the friluftsframjandetApp
 */
app.obj.angularApp
	.controller('controller.dashboard', function ($scope, $rootScope, $location, $injector, api, utility) {
		var me = {};

		me.init = function () {
			$rootScope.page = 1;
			$rootScope.title = 'Main Page';
			me.measures = [
				["Count( {$<Priority={'High'}, Status -={'Closed'} >} Distinct %CaseId )", false],
				["Count( {$<Priority={'Medium'}, Status -={'Closed'} >} Distinct %CaseId )", false],
				["Count( {$<Priority={'Low'}, Status -={'Closed'} >} Distinct %CaseId )", false],
			];
			$scope.kapi = [];
			$scope.objects = ['a5e0f12c-38f5-4da9-8f3f-0e4566b28398'];
		}
		
		me.boot = function () {
			me.init();
			
			me.events();

			me.createKpis();

			utility.log('Page loaded: ', $scope.page);
		};

		me.events = function () {
			me.createKpis = function() {
				angular.forEach(me.measures, function(value, key) {
					api.getHyperCube([], [value[0]], function(data){
						$scope.kapi[key] = (value[1])?utility.string2thousands(data[0][0].qText):data[0][0].qText;
					});
				});
			}
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
