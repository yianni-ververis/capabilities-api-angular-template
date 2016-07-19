/*
 * @owner yianni.ververis@qlik.com
 *
 */
var me = {
	v: '1.0.7',
	obj: {
		qlik: null,
		app: null,
		angularApp: null,
		model: [],
		getObjectModel: []
	}
};

me.init = function () {
	me.config = {
		host: 'localhost',
		prefix: "/",
		port: 4848, // 443 for Sense Server
		id: 'Helpdesk Management.qvf'
	};
	me.vars = {};
}

me.boot = function () {
	me.init();
	me.obj.app = me.obj.qlik.openApp(me.config.id, me.config);
	console.log('%c App ' + me.v + ': ', 'color: red', 'Loaded!');
};

app = me;
