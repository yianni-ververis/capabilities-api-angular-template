'use strict';

/**
 * @ngdoc function
 * @name friluftsframjandetApp.controller:controller.d3
 * @author yianni.ververis@qlik.com
 * @description
 * # controller.d3
 * Controller of the myApp
 */
app.obj.angularApp
	.controller('controller.d3', function ($scope, $rootScope, $location, $injector, api, utility) {
		var me = {};

		me.init = function () {
			$rootScope.page = 3;
			$rootScope.title = 'D3 Example';
			me.dimension = 'Case Owner Group';
			me.measure = 'Avg([Case Duration Time])';
		}
		
		me.boot = function () {
			me.init();
			
			me.events();

			me.getData();
			// app.obj.app.getObject('CurrentSelections', 'CurrentSelections');

			utility.log('Page loaded: ', $scope.page);
		};

		me.events = function () {
			me.getData = function() {
				api.getHyperCube([me.dimension], [me.measure], function(data){
					me.createBarChart(data);
				});
			}
			me.createBarChart = function (data) {
				var vars = {
					id: 'chart',
					data: data,
					height: 300,
					width: 500,
					bar: {
						height: 35,
						padding: 3,
						border: 1,
						color: '#4477AA',
						colorHover: '#77b62a',
						borderColor: '#404040'
					},
					label: {
						visible: true,
						width: 200,
						padding: 15
					},
					footer: {
						visible: true,
						height: 20
					},
					canvasHeight: null,
					template: '',
				};
				var element = $('#'+vars.id);
				vars.data = vars.data.map(function(d) {
					return {
						"dimension":d[0].qText,
						"measure":d[1].qText,
						"measureNum":d[1].qNum,
						"qElemNumber":d[0].qElemNumber,
					}
				});

				var dMax = d3.max(vars.data, function(d) { return d.measureNum; });
				vars.canvasHeight = (vars.data.length * (vars.bar.height+(vars.bar.padding*2)+3));

				vars.template = '\
					<div class="barchart" id="barchart">\
						<div class="content"></div>\
				';
				if (vars.footer.visible) {
					vars.template += '<div class="footer"></div>';
				};
				vars.template += '</div>';

				element.html($(vars.template).width(vars.width).height(vars.height));
				if (vars.footer.visible) {
					$('#' + vars.id + ' .content').height(vars.height-vars.footer.height);
					$('#' + vars.id + ' .footer').height(vars.footer.height);
				} else {
					$('#' + vars.id + ' .content').height(vars.height);
				}

				var x = d3.scale.linear()
					.domain([0,dMax])
					.range([0, (vars.label.visible)?vars.width-vars.label.width-(vars.label.padding*2):vars.width]);

				var y = d3.scale.linear()
					.domain([0,vars.data.length])
					.range([10,vars.canvasHeight]);

				var	xAxis = d3.svg.axis()
					.scale(x)
					.orient('bottom');

				var	yAxis = d3.svg.axis()
					.scale(y)
					.orient('left')
					.tickSize(1)
					.tickFormat(function(d,i){
						return vars.data[i].dimension;
					})
					.tickValues(d3.range(vars.data.length)); //1167

				var svg = d3.select('#barchart .content')
					.append('svg')
					.attr({'width':vars.width,'height':vars.canvasHeight});
			
				var svgFooter = d3.select('#barchart .footer')
					.append('svg')
					.attr({'width':vars.width,'height':vars.footer.height});

				// Y Axis labels
				var y_xis = svg.append('g')
					.attr("transform", "translate("+vars.label.width+",10)")
					.attr('id','yaxis')
					.call(yAxis)
					.selectAll("text")  
						.style("text-anchor", "start")
						.attr("x", "-"+vars.label.width);

				// X Axis labels
				var x_xis = svgFooter.append('g')
					.attr("transform", "translate("+((vars.label.visible)?vars.label.width:0)+",0)")
					.attr('id','xaxis')
					.call(xAxis
						.tickSize(1)
				    	.ticks(vars.verticalGridLines)
				    );

				// Draw bars
				svg.append('g')
					.attr("transform", "translate("+((vars.label.visible)?vars.label.width:0)+",-20)") //-20
					.attr('id','bars')
					.selectAll('#barchart rect')
					.data(vars.data)
					.enter()
					.append('rect')
					.attr('height', function(d,i){ return vars.bar.height; })
					.attr({'x':0,'y':function(d,i){ return y(i)+19; }})
					.attr('style', '\
						fill: ' + vars.bar.color + '; \
						stroke-width:' + vars.bar.border + '; \
						stroke: ' + vars.bar.borderColor + ';\
						cursor: pointer;\
					')
					.attr('width',function(d){ 
						return x(d.measureNum);
					})
					.on('mouseover', function(d, i){
						d3.select(this).style("fill", vars.bar.colorHover);
					})
					.on('mouseout', function(d, i){
						d3.select(this).style("fill", vars.bar.color);
					})
					.on('click', function(d, i) {
						app.obj.app.field(me.dimension).select([d.qElemNumber], false, false)
					});

				// Draw text 
				svg.append('g')
					.attr("transform", "translate("+((vars.label.visible)?vars.label.width:0)+",-20)") //-20
					.attr('id','text')
					.selectAll('#barchart text')
					.data(vars.data)
					.enter()
					.append('text')
					.attr({'x':function(d) {
						return x(d.measure)+10; 
					},'y':function(d,i){ 
						return y(i)+40; 
					}})
					.text(function(d){ return parseInt(d.measureNum); })
					.attr("class", function(d) { 
						return 'barTextOut';
					});
			}

			// Clear current scope's function
			$rootScope.clearAll = function () {
				app.obj.app.clearAll();
			}
			$rootScope.goTo = function(page) {
				api.destroyObjects().then(function(){
					$location.url('/' + page);
				});
			}
		}

		me.boot();
	});
