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
						$glyphs = $font.find('.glyphs'),
						$indicator = $font.find('.font-toggle');
					$glyphs.slideToggle('fast');
					$indicator.toggleClass('icon-plus icon-minus');

				},
				'click .font-remove': function(e){
					e.preventDefault();
					e.stopPropagation();
					this.model.destroy();
				},
				'click .upload': function(e){
					$('.qq-upload-button input', '#upload').click();
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
						action: '/api/upload/',
						element: self.$('#upload').get(0),
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
							if (data.glyph) {
								app.firstfont.addGlyph(data);
							} else {
								app.fonts.add(data);
							}
							self.showProgress(false);

						},
						onError: function(a, b, err){
							self.showProgress(false);
						}
					});
			},
			showProgress: function(c, t) {
				var $progress = this.$('.progress'),
					$bar = $('.bar', $progress);
				if (t){
					var width = (c / t * 100) + '%';
					$progress.show();
					$bar.width(width);
					if (c === t) {
						this.showProgress(false);
					}
				} else if (c) {
					$progress.show();
				} else if (c === false){
					$progress.hide();
					$bar.width(0);
				}
			}
		});
	return View;
});