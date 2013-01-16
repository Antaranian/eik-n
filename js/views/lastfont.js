define([
	'jquery',
	'underscore',
	'backbone',
	'qq',
	'scroll'
], function($, _, Backbone, qq){
	var View = Backbone.View.extend({
			events: {
				'submit #last-options form': function(e){
					e.preventDefault();
					this.$('#last-options').slideUp('fast');
					return false;
				},
				'change #last-options input': function(e){
					// e.prevendDefaults();
					var $input = this.$(e.target).closest('input'),
						key = $input.attr('name'),
						val = $.trim($input.val());

					if (val == '') {
						$input.val(this.model.get(key));
					} else {
						this.model.set(key, val);
					}
				},
				'click #generate-font:not(.disabled)': function(e){
					this.model.save();
					return false;
				},
				'click .reset': function(e){
					this.model.glyphs.reset();
				},
				'click .options': function(e){
					this.$('#last-options').slideToggle();
				}
			},
			initialize: function(model){
				this.model = model;

				this.render();
				this.delegate();
			},
			render: function(){
				var data = this.model.toJSON();
				
				this.$el = $('#last-font');

				var $glyphs = this.$('#last-glyphs'),
					glyphsHeight = $glyphs.height();
				$glyphs.slimScroll({ height: glyphsHeight });

				this.$generate = self.$('#generate-font');
				this.$download = self.$('#download-font');

				this.uploadify()
			},
			uploadify: function(){
				var self = this,
					el = self.$('#upload-glyph').get(0);
			},
			delegate: function(){
				var self = this;

				this.model.on('change', function(){
					self.$download.hide();
					if (this.glyphs.length) {
						self.$generate.removeClass('disabled');
					} else {
						self.$generate.addClass('disabled');
					}
				});

				this.model.on('generated', function(href){
					self.$download
						.attr('href', href)
						.css('display', 'block');
					self.$generate.addClass('disabled');
					$.download(href);
				});
			}
		});
	return View;
});