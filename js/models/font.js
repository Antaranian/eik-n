define([
	'jquery',
	'underscore',
	'backbone',
	'views/font',
	'collections/glyphs'
], function($, _, Backbone, FontView, Glyphs) {
	var Model = Backbone.Model.extend({
			initialize: function(){
				this.view = new FontView(this);

				this.glyphs = new Glyphs(this.get('glyphs'), this);
			}
		});
	return Model;
});