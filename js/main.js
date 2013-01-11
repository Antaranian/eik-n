require.config({
	paths: {
		// Core Libraries
		'jquery'	: 'libs/jquery',
		'underscore': 'libs/lodash',
		'backbone'	: 'libs/backbone',
		// Plugins
		'qq'		: 'plugins/jquery.qq',
		'scroll'	: 'plugins/jquery.slimscroll',
		'plugins'	: 'plugins/misc',
		'jqueryui'	: 'plugins/jquery.ui',
		'bootstrap'	: 'plugins/bootstrap',
		// Directory routing
		'templates'	: '../tpl'
	},
	shim: {
		// Misc jQuery plugins
		'plugins': ['jquery'],
		// Twitter Bootstrap js files
		'bootstrap': ['jquery'],
		// Valums uploader plugin
		'qq': {
			'deps': ['underscore', 'jquery'],
			'exports': 'qq'
		},
		// jQuery UI
		'jqueryui': ['jquery'],
		// SlimScroll plugin
		'scroll': ['jquery', 'jqueryui'],

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
});