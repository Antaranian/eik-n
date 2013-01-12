define([
	'jquery',
	'underscore',
	'backbone',
	'views/glyph'
], function($, _, Backbone, GlyphView) {
	var Model = Backbone.Model.extend({
			// idAttribute: 'name',
			initialize: function(){
				this.set('fontid', this.collection.font.id);
				this.set('id', this.get('fontid') + '-' + this.get('name'));
				
				this.view = new GlyphView(this);
			}
		});
	return Model;
});