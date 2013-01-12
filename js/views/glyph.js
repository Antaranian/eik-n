define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/glyph.html'
], function($, _, Backbone, tpl){
	var View = Backbone.View.extend({
			className: 'glyph',
			tagName: 'li',
			tpl: _.template(tpl),
			events: {
				'click': function(){
					app.lastfont.toggleGlyph(this.model.toJSON());
				}
			},
			initialize: function(model){
				this.model = model;
				this.$parent = model.collection.font.view.$('.glyphs');

				this.render();
				this.delegate();
			},
			render: function(){
				var data = this.model.toJSON();
				
				var markup = this.tpl(data);
				this.$el
					.html(markup)
					.appendTo(this.$parent);
			},
			delegate: function(){
				this.model.on('destroy', function(){
					this.remove();
				}, this);

				this.model.on('last', function(action){
					action += 'Class'; 
					this.$el[action]('active');
				}, this);
			}
		});
	return View;
});