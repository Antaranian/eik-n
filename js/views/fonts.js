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
				var self = this,
					el = self.$('#upload-font').get(0);

				new qq.FileUploader({
						action: '/api/fonts/upload/',
						element: el,
						multiple: true,
						allowedExtensions: ['svg', 'ttf'],
						uploadButton: "Import",
						onComplete: function(a, b, data){
							if (data.error) {
								app.log('error', data.error);
								return false;
							}
							app.fonts.add(data);
						},
						onError: function(a, b, err){
							app.log('error', 'Something was wrong. Please try again');
						}
					});
			},
		});
	return View;
});