'use strict';

/**
 * @ngdoc function
 * @owner yianni.ververis@qlik.com
 * @description
 * # app
 * Controller of the myApp
 */
app.angularApp
.service('app', function ($q, $rootScope, utility) {
	var me = this;
console.log(app.qlik)			
	me.version = '1.0.4';
	me.obj = {
		qlik: null,
		app: null,
		angularApp: null,
		model: [],
		getObjectModel: []
	}
	me.envirnonment = {
		local: {
			host: 'localhost',
			prefix: "/",
			port: 4848,
			isSecure: false,
			id: 'Helpdesk Management.qvf'
		},
	};
	me.config = me.envirnonment.local;
	
	me.obj.app = me.obj.qlik.openApp(me.config.id, me.config);

	utility.log('App loaded: ', me.version);
});