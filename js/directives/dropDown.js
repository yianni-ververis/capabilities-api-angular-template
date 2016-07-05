';use strict';

/**
 * @ngdoc function
 * @name myApp.directive: dropDown
 * @description
 * # dropDown
 * Controller of the myApp
 */
app.obj.angularApp
	.directive('dropDown', function($parse, $sce, $compile, $timeout, api) {
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
				dimension: '=',
				// name: '=',
				id: '=',
				// width: '=',
				title: '=',
				showselected: '=',
			};

			me.def.link = function (scope, element, attrs) {
				var html = '';
				scope.$watch('dimension',function(newValue,oldValue) {
					api.getHyperCubeQ([newValue], []).then(function(data){
						// Create the template
						html = '<div class="btn-group" id="' + scope.id + '">\n\
							<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\n\
								' + scope.title + ' <span class="caret"></span>\n\
							</button>\n\
							<ul class="dropdown-menu scrollable-menu" role="menu">\n';
						data.forEach(function(value, key) {
							html += '<li><a>' + value[0].qText + '</a></li>\n'
						})
						html += '</ul>\n\
							</div>';
						// Inject the template into the dom
						element.html(html);
						// Enable it
						$('#' + scope.id + ' .dropdown-toggle').dropdown();
						// Make selections in the qvf
						$('#' + scope.id + ' li').on('click', function(event){
							// Remove previous selections if any
							$('#' + scope.id + ' li').removeClass('active');
							$( this ).addClass('active');
							if (scope.showselected) {
								var text = $( this ).text() + ' <span class="caret"></span>';
								$('#' + scope.id + ' button').html(text);
							}
							app.obj.app.field(scope.dimension).selectValues([{qText: $( this ).text()}], false, false);
						})
					})
				}); 
			};

			return me.def;
		};

		return me.boot();
	});