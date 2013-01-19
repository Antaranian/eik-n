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
				// return this.
			},
			deactivate: function(){
				this.each(function(glyph){
					glyph.trigger('last', 'remove');
				});
			}
		});
	return Collection;
});