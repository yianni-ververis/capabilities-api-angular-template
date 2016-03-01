';use strict';

/**
 * @ngdoc function
 * @name myApp.directive: getObject
 * @description
 * # getObject
 * Controller of the myApp
 */
app.obj.angularApp
.directive('getObject', function($parse, $sce, $compile) {
	var me = {
		def: {
			restrict: 'AE',
    		transclude: false,
    		replace: true
		}
	};

	me.boot = function () {
		me.def.scope = {
			object: '=object',
			height: '=height'
		};

		me.def.link = function (scope, element, attrs) {
			if (element[0].innerHTML.length==0) {
				var html = '<div class="qvobject" data-qvid="' + scope.object + '" id="' + scope.object + '" style="height: ' + scope.height + 'px;"></div>';
				element.html(html);
				app.obj.app.getObject(scope.object, scope.object);
			}
		};

		return me.def;
	};

	return me.boot();
});