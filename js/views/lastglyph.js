define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/lastglyph.html'
], function($, _, Backbone, tpl){
	var View = Backbone.View.extend({
			className: 'last-glyph glyph',
			tagName: 'li',
			tpl: _.template(tpl),
			events: {
				'blur .glyph-name': function(){
					var name = this.$('.glyph-name').html();
					this.model.set('name', name);
					// app.lastFont.editGlyph(this.model);
				},
				'click .close': function(){
					this.model.destroy();
				}
			},
			initialize: function(model){
				this.model = model;

				this.render();
				this.delegate();
			},
			render: function(){
				var data = this.model.toJSON();
				
				// console.log(data);
				var markup = this.tpl(data);
				this.$el
					.html(markup)
					.appendTo('#last-glyphs');

				this.$code = this.$('.glyph-code');
			},
			delegate: function(){
				this.model.on('destroy', function(){
					this.remove();
				}, this);
			}
		});
	return View;
});