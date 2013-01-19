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

				this.delegate();
			},
			delegate: function(){
				this.collection.on('reset', function(){
					this.view.remove();
				}, this);

				this.on('last', function(ev){
					this.active = ev === 'add';
				});
			}
		});
	return Model;
});