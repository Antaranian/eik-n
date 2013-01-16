define([
	'jquery',
	'underscore',
	'backbone',
	'collections/fonts',
	'models/firstfont',
	'models/lastfont',
	'views/screen',
	'json!data/fonts.js'
], function($, _, Backbone, Fonts, FirstFont, LastFont, Screen, fontsData){
	var App = function(){
		var self = {
				view	: new Screen(),
				fonts	: new Fonts()
			};



		// fontsData.unshift(self.firstfont)
		// console.log(data);
		self.initialize = function(){
			self.firstfont = new FirstFont();
			self.lastfont = new LastFont();
			
			fontsData = _.isArray(fontsData) ? fontsData : [];
			app.fonts.add(fontsData);
		};

		// var alert = new Alert();
		self.log = function(e, txt){
		// 	alert.render(e, txt);
		};

		return self;
	};
	return App;
});
