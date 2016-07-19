';use strict';

/**
 * @ngdoc function
 * @name myApp.directive: visualization
 * @description
 * Creating an element rom the Visualization API
 * https://help.qlik.com/en-US/sense-developer/3.0/Subsystems/APIs/Content/VisualizationAPI/VisualizationAPI.htm
 * Available visualization types
 * barchart
 * combochart
 * gauge
 * kpi
 * linechart
 * piechart
 * pivot-table
 * scatterplot
 * table
 * treemap
 * Controller of the myApp
 */
app.obj.angularApp
	.directive('visualization', function($parse, $sce, $compile, $timeout, api) {
		var me = {
			def: {
				restrict: 'AE',
        		replace: true,
                terminal: true
			}
		};

		me.boot = function () {
			// Get all the attributes
			me.def.scope = {
				id: '=',
				title: '=',
				type: '=',
				columns: '=',
				height: '='
			};

			me.def.link = function (scope, element, attrs) {
				var html = '';
				scope.$watch('columns',function(newValue,oldValue) {
					// Create the template
					html = '<div id="' + scope.id + '" style="height:' + scope.height + 'px">\n\
						</div>';
					// Inject the template into the DOM
					element.html(html);
					app.obj.app.visualization.create(scope.type,scope.columns,{title:scope.title}).then(function(obj){
						obj.show(scope.id);
					}); 
				}); 
			};

			return me.def;
		};

		return me.boot();
	});