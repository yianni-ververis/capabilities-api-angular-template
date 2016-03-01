';use strict';

/**
 * @ngdoc function
 * @name friluftsframjandetApp.controller: exportToCsv
 * @description 
 * exports a hyperqube to csv
 * Directive of the friluftsframjandetApp
 */
app.obj.angularApp
.directive('exportToCsv', function($parse, $sce, $compile, api) {
	var me = {
		def: {
			restrict: 'A'
		}
	};

	me.boot = function () {
		me.def.scope = {
			title: '=title',
			headers: '=headers',
			data: '=data'
		};

		me.def.link = function (scope, element, attrs) {
			var el = element[0];
			element.bind('click', function(e){
				api.getHyperCubeQ(scope.data[0], scope.data[1]).then(function(data){
					var csvString = '';
					if (scope.title.length) {
						csvString = scope.title + "\n";
					}
					if (scope.headers.length) {
						for(var i=0; i<scope.headers.length;i++){
							csvString = csvString + scope.headers[i] + ((i==(scope.headers.length-1))?"\n":",");
						}
					}
					for(var i=0; i<data.length;i++){
						var rowData = data[i];
						for(var j=0; j<rowData.length;j++){
							csvString = csvString + rowData[j].qText + ((j==(rowData.length-1))?"\n":",");
						}
					}
					var a = $('<a/>', {
						style:'display:none',
						href:'data:application/octet-stream;base64,' + btoa(csvString),
						download: scope.title + '.csv'
					}).appendTo('body')
					a[0].click()
					a.remove();
				});
			});
			
		};

		return me.def;
	};

	return me.boot();
});