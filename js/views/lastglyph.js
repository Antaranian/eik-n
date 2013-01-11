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
				'click .cog': function(){
					this.$el
						.siblings()
						.find('.settings')
							.hide();
					this.$('.settings').toggle();
					return false;
				},
				'keyup .glyph-code': function(){
					var value = this.$code.html();
					value = value.replace(/[^(0-9a-f)]/ig,'').substring(0, 4);
					this.$code.html(value);
				},
				'focus .glyph-code': function(){
					var value = this.$code.html();
					value = value.replace(/^(U\+)/ig,'');
					this.$code.html(value);	
				},
				'blur .glyph-code': function(){
					var value = 'U+' + this.$code.html();
					this.$code.html(value);
					this.model.set('code', code);
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