define([
	'jquery',
	'underscore',
	'backbone',
	'qq',
	'scroll'
], function($, _, Backbone, qq){
	var View = Backbone.View.extend({
			events: {
				'change #font-name': function(e){
					var $name = this.$('#font-name'),
						name = $.trim($name.val());
					if (name = '') {
						$name.val(this.model.get('fontname'));
					} else {
						this.model.set('fontname', name);
					}
				},
				'click #generate-font:not(.disabled)': function(e){
					this.model.save();
					return false;
				},
				'click .reset': function(e){
					this.model.glyphs.reset();
				},
				'click .upload': function(e){
					$('#upload-glyph .qq-upload-button input').click()
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

				new qq.FileUploader({
						action: '/api/glyphs/upload/',
						element: el,
						multiple: true,
						allowedExtensions: ['svg'],
						onComplete: function(a, b, data){
							if (data.error) {
								app.log('error', data.error);
								return false;
							}
							self.model.glyphs.add(data);
						}
					});
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