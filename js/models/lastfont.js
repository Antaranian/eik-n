define([
	'jquery',
	'underscore',
	'backbone',
	'views/lastfont',
	'collections/lastglyphs'
], function($, _, Backbone, FontView, Glyphs) {
	var Model = Backbone.Model.extend({
			defaults: {
				name: 'Designmodo',
				prefix: 'icon-'
			},
			initialize: function(){
				this.glyphs = new Glyphs([], this);

				this.view = new FontView(this);
			},
			toggleGlyph: function(glyph){
				var g = this.glyphs.get(glyph.id);
				if (g) {
					g.destroy();
				} else {
					this.glyphs.add(glyph);
				}
			},
			source: function(){
				var glyphs = this.glyphs.toJSON();
				return _.extend(this.toJSON(), {
						glyphs: glyphs
					});
			},
			save: function(){
				var self = this;

				$.ajax({
					url: '/api/fonts/generate',
					data: self.source(),
					type: 'post',
					dataType: 'json',
					success: function(href, b){
						self.trigger('generated', href);		
					}
				});
			}
		});
	return Model;
});