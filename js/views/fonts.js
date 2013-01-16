define([
	'jquery',
	'underscore',
	'backbone',
	'qq',
	'scroll'
], function($, _, Backbone, qq){
	var View = Backbone.View.extend({
			events: {
				'click .font-header': function(e){
					var $font = $(e.target).closest('.font'),
						$glyphs = $font.find('.glyphs');
					$glyphs.slideToggle('fast');
				},
				'click .font-remove': function(e){
					e.preventDefault();
					e.stopPropagation();
					this.model.destroy();
				},
				'click .upload': function(e){
					var $btn = $(e.target).closest('.btn'),
						target = $btn.data('target');

					$('.qq-upload-button input', target).click();

					console.log(target, $('.qq-upload-button input', target).get())
				}
			},
			initialize: function(model){
				this.model = model;

				this.$el = $('#prepare-fonts');

				this.render();
				this.delegate();
			},
			render: function(){
				var $fonts = this.$('#fonts'),
					fontsHeight = $fonts.height();
				$fonts.slimScroll({ height: fontsHeight	});

				this.uploadify();
			},
			delegate: function(){

			},
			uploadify: function(){
				var self = this;

				self.uploadFont = new qq.FileUploader({
						action: '/api/fonts/upload/',
						element: self.$('#upload-font').get(0),
						multiple: true,
						allowedExtensions: ['svg', 'ttf'],
						uploadButton: "Import",
						onUpload: function(a, b){
							self.showProgress(true);
						},
						onProgress: function(a, b, c, d){
							self.showProgress(c, d);
						},
						onComplete: function(a, b, data){
							if (data.error) {
								app.log('error', data.error);
								return false;
							}
							app.fonts.add(data);
							self.showProgress(false);
						},
						onError: function(a, b, err){
							self.showProgress(false);
						}
					});

				self.uploadGlyph = new qq.FileUploader({
						action: '/api/glyphs/upload/',
						element: self.$('#upload-glyph').get(0),
						multiple: true,
						allowedExtensions: ['svg'],
						onUpload: function(a, b){
							self.showProgress(true);
						},
						onProgress: function(a, b, c, d){
							self.showProgress(c, d);
						},
						onComplete: function(a, b, data){
							if (data.error) {
								app.log('error', data.error);
								return false;
							}
							app.firstfont.addGlyph(data);
							self.showProgress(false);
						},
						onError: function(a, b, err){
							self.showProgress(false);
						}
					});
			},
			showProgress: function(c, t) {
				if (t){
					var width = (c / t * 100) + '%';
					this.$('.progress').show()
						.find('.bar')
							.width(width);
					if (c === t) {
						this.$('.progress').hide();
					}
				} else if (c) {
					this.$('.progress').show();
				} else {
					this.$('.progress')
						hide()
						.find('.bar')
							.width(0);
				}
			}
		});
	return View;
});