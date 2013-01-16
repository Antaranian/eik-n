define([
	'jquery',
	'backbone',
	'models/lastglyph'
], function($, Backbone, LastGlyph) {
	var Collection = Backbone.Collection.extend({
			url: '/api/glyphs',
			model: LastGlyph,
			initialize: function(d, font){
				this.font = font; 

				this.delegate();
			},
			delegate: function(){
				this.on('all', function(ev, glyph){
					this.font.trigger('change');
					if (/add|remove/.test(ev)) {
						var fontid = glyph.get('fontid'); 

						var font = app.fonts.get(fontid),
							g = font.glyphs.get(glyph.id);
						g.trigger('last', ev);
					}
				});
			}
		});
	return Collection;
});