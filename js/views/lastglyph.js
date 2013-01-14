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
				'change .glyph-name': function(e){
					var name = this.$name.val();
					this.model.setName(name);
				},
				'click .close': function(){
					this.model.destroy();
				}
			},
			initialize: function(model){
				this.model = model;

				this.$el
					.appendTo('#last-glyphs');

				this.render();
			},
			render: function(){
				var data = this.model.toJSON(),
					markup = this.tpl(data);

				this.$el.html(markup);

				this.$name = this.$('.glyph-name');

				this.delegate();
			},
			delegate: function(){
				this.model.on('destroy', function(){
					this.remove();
				}, this);
				// this.model.on('change:name', function(a, name){
				// 	this.$name.val(name);
				// }, this);
			}
		});
	return View;
});