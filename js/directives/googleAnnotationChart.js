';use strict';

/**
 * @ngdoc function
 * @name myApp.directive: googleAnnotationChart
 * @description
 * # dropDown
 * Controller of the myApp
 */
app.obj.angularApp
    .directive('googleAnnotationChart', function($parse, $sce, $compile, $timeout, $q, api) {
        var me = {
            def: {
                restrict: 'AE',
                transclude: true
            }
        };

        me.boot = function() {
            // Get all the attributes
            me.def.scope = {
                data: '=',
                dt: '=',
            };

            me.def.link = function(scope, element, attrs) {
            	google.charts.load('current', {'packages':['annotationchart']});
                scope.$watchCollection('data', function(obj) {
                    api.getHyperCubeQ(obj.dimensions, obj.measures).then(function(res) {
                        me.def.cssTemplate(obj);
                        var table = [obj.headers];
                        for (var i=0; i<res.length; i++) {
                            var row = [
                                new Date(res[i][0].qText), 
                                res[i][3].qNum, 
                                (res[i][1].qText!=='-') ? res[i][1].qText : null, 
                                (res[i][2].qText!=='-') ? res[i][2].qText : null, 
                            ]
                            if (res[i][4]) {
                                row.push(res[i][4].qNum)
                            }
                            if (res[i][5]) {
                                row.push(res[i][5].qNum)
                            }
                            if (res[i][6]) {
                                row.push(res[i][6].qNum)
                            }
                            table.push(row);
                        }
                        google.charts.setOnLoadCallback(drawChart);
                        function drawChart() {
                            var data = google.visualization.arrayToDataTable(table, false); // 'false' means that the first row contains labels, not data.
                            me.chart = new google.visualization.AnnotationChart(document.getElementById(obj.id));
                            me.chart.draw(data, obj.options);
                            me.chart.setVisibleChartRange(obj.zoomStart, obj.zoomEnd)                            
                        }
                    })
                });
                scope.$watchCollection('dt', function(obj) {
                    if (me.chart && obj.from && obj.to) {
                        me.chart.setVisibleChartRange(obj.from, obj.to)
                    }
                });
            };
            
            me.def.cssTemplate = function (obj) {
                var css = '\n\
                    <style type="text/css">\n\
                        #' + obj.id + ' {\n\
                            height: ' + obj.height + 'px;\n\
                        }\n\
                        #' + obj.id + ' .title {\n\
                            font-size: 12px;\n\
                            color: #000000;\n\
                            font-weight: 600; \n\
                        }\n\
                        .google-visualization-atl.container {\n\
                            padding: 0 0; \n\
                        }\n\
                        .google-visualization-atl .annotationsContainer .google-visualization-table-td {\n\
                            padding-top: 1px; \n\
                            padding-right: 0; \n\
                        }\n\
                        #elections_AnnotationChart_zoomControlContainer_1-day, \n\
                        #elections_AnnotationChart_zoomControlContainer_1-hour {\n\
                            display: none;\n\
                        }\n\
                    </style>\n\
                ';
                angular.element('head').append(css);
            }
            
            me.def.template = '\n\
                <div id="{{data.id}}">\n\
                </div>';

             return me.def;
        }

        return me.boot();
    });