';use strict';

/**
 * @ngdoc function
 * @name myApp.directive: getObject
 * @description
 * # getObject
 * Controller of the myApp
 */
app.obj.angularApp
	.directive('getObject', function($parse, $sce, $compile, $timeout) {
		var me = {
			def: {
				restrict: 'AE',
        		replace: true,
                terminal: true
			}
		};

		me.boot = function () {
			me.def.scope = {
				qvid: '=',
				id: '=',
				height: '=',
				interaction: '=',
			};

			me.def.link = function (scope, element, attrs) {
				scope.$watch('qvid',function(newValue,oldValue) {
					var noInteraction = (_.isUndefined(scope.interaction) || scope.interaction) ? false : true;
					if (element[0].innerHTML.length==0) {
						var html = '<div class="qvobject" id="' + scope.id + '" style="height: ' + scope.height + 'px;"></div>';
						element.html(html);
						$timeout(function(){
							app.obj.app.getObject(scope.id, newValue, {noInteraction: noInteraction}).then(function(model){
								app.obj.getObjectModel.push(model);
							});
						}, 500);
					} else {
						$( "#" + scope.id ).animate({
							opacity: 0,
						}, 400, function() {
							var html = '<div class="qvobject" id="' + scope.id + '" style="height: ' + scope.height + 'px;"></div>';
							element.html(html);
							app.obj.app.getObject(scope.id, newValue, {noInteraction: noInteraction}).then(function(model){
								app.obj.getObjectModel.push(model);
								$( "#" + scope.id ).animate({opacity: 1}, 400);
							});

						});
					}
				}); 
			};

			return me.def;
		};

		return me.boot();
	});