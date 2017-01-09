';use strict';

/**
 * @ngdoc function
 * @name myApp.directive: dropDown
 * @description
 * # dropDown
 * <drop-down data-dimension="'Cases Open/Closed'" data-title="'CASES OPEN/CLOSED'" data-id="'cases'" data-showselected="true" font-size="25"></drop-down>
 */
app.obj.angularApp
    .directive('dropDown', function($parse, $sce, $compile, $timeout, api) {
        var me = {
            def: {
                restrict: 'AE',
                transclude: true
            }
        };

        me.boot = function() {
            // Get all the attributes
            me.def.scope = {
                dimension: '=',
                name: '=',
                id: '=',
                title: '=',
                width: '=',
                fontSize: '@',
            };

            me.def.link = function(scope, element, attrs) {
                scope.items = {};
                scope.currentItem = {
                    qText: scope.title
                };
                scope.$watch('dimension', function(newValue, oldValue) {
                    scope.fontSize = (scope.fontSize) ? scope.fontSize : '14';
                    me.def.cssTemplate(scope);
                    api.getHyperCubeQ([newValue], []).then(function(data) {
                        scope.items = data;
                    })
                });
                scope.dropDownChangeTitle = function (obj) {
                    app.obj.app.field(scope.dimension).select([obj.qElemNumber], false, false)
                    scope.title = obj.qText;
                    scope.currentItem = obj;
                }
            };
            
            me.def.template = '\n\
                <div class="btn-group" id="{{id}}">\n\
                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\n\
                        {{currentItem.qText}} <span class="caret"></span>\n\
                    </button>\n\
                    <ul class="dropdown-menu scrollable-menu" role="menu">\n\
                        <li ng-repeat="item in items"><a ng-click="dropDownChangeTitle(item[0])" ng-class="(currentItem.qElemNumber==item[0].qElemNumber)?\'active\':\'\'">{{item[0].qText}}</a></li>\n\
                    </ul>\n\
                </div>';
            
            
            me.def.cssTemplate = function (obj) {
                var css = '\n\
                    <style type="text/css">\n\
                        #' + obj.id + ' .btn {\n\
                            font-size: ' + obj.fontSize + 'px;\n\
                        }\n\
                        #' + obj.id + ' .dropdown-menu>li>a {\n\
                            font-size: ' + obj.fontSize + 'px;\n\
                        }\n\
                    </style>\n\
                ';
                angular.element('head').append(css);
            }

             return me.def;
        }

        return me.boot();
    });