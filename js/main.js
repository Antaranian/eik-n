require.config({
	paths: {
		// Core Libraries
		'jquery'	: 'libs/jquery',
		'underscore': 'libs/lodash',
		'backbone'	: 'libs/backbone',
		// Plugins
		'qq'		: 'plugins/jquery.qq',
		'scroll'	: 'plugins/jquery.slimscroll',
		'storage'	: 'plugins/jquery.totalstorage',
		'plugins'	: 'plugins/misc',
		'jqueryui'	: 'plugins/jquery.ui',
		'bootstrap'	: 'plugins/bootstrap',
		// Directory routing
		'templates'	: '../tpl'
	},
	shim: {
		// Twitter Bootstrap js files
		'bootstrap': ['jquery'],
		// jQuery UI
		'jqueryui': ['jquery'],
		
		// Misc jQuery plugins
		'plugins': ['jquery'],
		// Valums uploader plugin
		'qq': {
			'deps': ['underscore', 'jquery'],
			'exports': 'qq'
		},
		// SlimScroll plugin
		'scroll': ['jquery', 'jqueryui'],
		//TotalStorage plugin
		'storage': ['jquery'],

		// Backbone
		'backbone': {
				'deps': ['underscore', 'jquery'],
				'exports': 'Backbone' 
		}
	}
});

require([
	'app',
	'plugins',
	'bootstrap'
], function(App) {
	window.app = App();
	app.initialize();
});