define([
	'jquery',
	'backbone',
	'models/glyph'
], function($, Backbone, Glyph) {
	var Collection = Backbone.Collection.extend({
			model: Glyph,
			initialize: function(d, font){
				this.font = font; 
				this.delegate();
			},
			delegate: function(){

			}
		});
	return Collection;
});