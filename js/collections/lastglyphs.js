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
					var font = app.fonts.get(glyph.get('dir')),
						g = font.glyphs.get(glyph.id);
					g.trigger('last', ev);
					// console.log(ev);
				});
				// this.on('add', function(a, b, c,){
				// 	console.log(a, b, c);
				// });
			}
		});
	return Collection;
});