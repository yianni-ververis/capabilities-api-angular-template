/*
 * @owner yianni.ververis@qlik.com
 *
 */
var me = {
	v: '1.0.4',
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
		host: null,
		prefix: "/",
		port: 4848,
		isSecure: false
	};
	me.vars = {
		server: {
			local: window.location.hostname
		},
		id: 'Helpdesk Management.qvf',
	};

	me.config.host = me.vars.server.local;
}

me.boot = function () {
	me.init();

	me.obj.app = me.obj.qlik.openApp(me.vars.id, me.config);

	me.events();
};

me.events = function () {
	$( document ).ready(function() {
		$(".container").height($("body").height() - 50);
	});
	$(window).resize(function() {
	    $(".container").height($("body").height());
	});
	console.log('%c App ' + me.v + ': ', 'color: red', 'Loaded!');
};

app = me;
