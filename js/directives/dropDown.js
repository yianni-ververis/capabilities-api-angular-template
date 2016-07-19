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
            };

            me.def.link = function(scope, element, attrs) {
                scope.items = {};
                scope.currentItem = {
                    qText: scope.title
                };
                scope.$watch('dimension', function(newValue, oldValue) {
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

             return me.def;
        }

        return me.boot();
    });