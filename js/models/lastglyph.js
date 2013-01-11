define([
	'jquery',
	'underscore',
	'backbone',
	'views/lastglyph'
], function($, _, Backbone, LastGlyphView) {
	var Model = Backbone.Model.extend({
			initialize: function(){
				this.view = new LastGlyphView(this);
			}
		});
	return Model;
});