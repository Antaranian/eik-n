define([
	'jquery',
	'underscore',
	'backbone',
	'views/glyph'
], function($, _, Backbone, GlyphView) {
	var Model = Backbone.Model.extend({
			// idAttribute: 'name',
			initialize: function(){
				this.set('dir', this.collection.font.get('dir'));
				this.set('id', this.get('dir') + '-' + this.get('name'));
				// console.log(this.toJSON());
				this.view = new GlyphView(this);
			}
		});
	return Model;
});