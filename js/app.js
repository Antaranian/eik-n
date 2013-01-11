define([
	'jquery',
	'backbone',
	'collections/fonts',
	'models/lastfont',
	'views/screen'
], function($, Backbone, Fonts, LastFont, Screen){
	var App = function(){
		var self = {
				view	: new Screen(),
				fonts	: new Fonts()
			};

		self.lastfont = new LastFont();
		
		self.initialize = function(){ };

		// var alert = new Alert();
		self.log = function(e, txt){
		// 	alert.render(e, txt);
		};

		return self;
	};
	return App;
});
