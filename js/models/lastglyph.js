define([
	'jquery',
	'underscore',
	'backbone',
	'views/lastglyph'
], function($, _, Backbone, LastGlyphView) {
	var Model = Backbone.Model.extend({
			initialize: function(){
				this.view = new LastGlyphView(this);

				this.delegate();
			},
			setName: function(name){
				var named = this.collection.where({ name: name });

				if (named.length) {
					this.setName(name + '-');
				}
				this.set('name', name);
			},
			delegate: function(){
				this.collection.on('reset', function(){
					this.view.remove();
				}, this);
			}
		});
	return Model;
});