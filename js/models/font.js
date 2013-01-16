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

				var glyphs = this.get('glyphs');
				this.glyphs = new Glyphs(glyphs, this);

				glyphs.length && this.view.show();

				this.delegate()
			},
			delegate: function(){
				this.glyphs.on('all', function(ev, a, b){
					console.log(ev, a, b);
				});
			}
		});
	return Model;
});