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
				this.on('all', function(ev, glyph, b){
					this.font.trigger('change');

					if (/add|remove/.test(ev)) {
						var fontid = glyph.get('fontid'),
							glyphid = glyph.id; 

						var font = app.fonts.get(fontid),
							glyph = font.glyphs.get(glyphid);

						glyph.trigger('last', ev);
					} else if (/reset/.test(ev)) {
						app.fonts.deactivate();
					}
				});
			}
		});
	return Collection;
});