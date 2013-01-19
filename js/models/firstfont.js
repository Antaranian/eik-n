define([
	'jquery',
	'underscore',
	'backbone',
	'views/font',
	'collections/glyphs',
	'storage'
], function($, _, Backbone, FontView, Glyphs) {
	var Model = Backbone.Model.extend({
			defaults: {
				id: 0,
				details: {
					name: 'Your Custom Fonts'
				},
				filename: null,
				glyphs: []
			},
			initialize: function(){
				this.view = new FontView(this);

				var glyphs = $.totalStorage('firstglyphs') || [];
				this.glyphs = new Glyphs(glyphs, this);
				
				if (glyphs.length) {
					this.view.show();
				}

				app.fonts.push(this);

				this.delegate();
			},
			addGlyph: function(data) {
				this.glyphs.add(data);
			},
			delegate: function () {
				var self = this;
				
				this.glyphs.on('all', function(ev, glyph, glyphs){
					this.save();
					if (this.glyphs.length) {
						this.view.show();
					} else {
						this.view.hide();
					}
				}, this);
			},
			save: function() {
				var glyphs = this.glyphs.toJSON();
				$.totalStorage('firstglyphs', glyphs);
			},
			destroy: function(){
				this.glyphs.reset();
			}
		});
	return Model;
});