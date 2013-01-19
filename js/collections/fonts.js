define([
	'jquery',
	'backbone',
	'views/fonts',
	'models/font'
], function($, Backbone, FontsView, Font) {
	var Collection = Backbone.Collection.extend({
			url: '/api/fonts',
			model: Font,
			initialize: function(){
				this.view = new FontsView(this);
				this.delegate();
			},
			delegate: function(){

			},
			deactivate: function(){
				this.each(function(font){
					font.glyphs.deactivate();
				});
			}
		});
	return Collection;
});