'use strict';

/**
 * @ngdoc function
 * @name friluftsframjandetApp.controller: api
 * @description
 * # api
 * Controller of the friluftsframjandetApp
 */
app.obj.angularApp
.service('api', function ($q, $rootScope, utility) {
	var me = this;
		
	// To get generic Hypercubes
	me.getHyperCube = function (dimensions, measures, callback, limit) {
		var qDimensions = [],
			qMeasures = [];
		if (dimensions.length) {
			angular.forEach(dimensions, function(value, key) {
				qDimensions.push({ 
					qDef: { 
						qGrouping: "N", 
						qFieldDefs: [ value ], 
					} 
				});
			});
		}
		if (measures.length) {
			angular.forEach(measures, function(value, key) {
				qMeasures.push({ 
					qDef : { 
						qDef : value
					}
				});
			});
		}
		app.obj.app.createCube({
			qDimensions : qDimensions,
			qMeasures : qMeasures,
			qInitialDataFetch : [{
				qTop : 0,
				qLeft : 0,
				qHeight : (limit)?limit:500,
				qWidth : 11
			}]
		}, function(reply) {
			utility.log('getMeasureData:', 'Success!');
			callback(reply.qHyperCube.qDataPages[0].qMatrix);
		});
	};

	// Add Google tracking
	me.ga = function (title) {
		ga('send', 'event', 'button', 'click', title, 1);
	};
});