define([
	'jquery',
	'backbone',
	'qq'
], function($, Backbone, qq){
	var View = Backbone.View.extend({
			events: {
				'submit form': function(e) {
					e.preventDefault();
				},
				'click #download:not(.disabled)': function(){
					
				},
				'click #options': function(e){
					e.stopPropagation();
				}			},
			initialize: function(model){
				this.model = model;

				this.$el = $('#container');

				this.uploadify();
				// this.delegate();
			},
			uploadify: function(){
				var self = this,
					el = self.$('#upload').get(0);

				new qq.FileUploader({
						action: '/api/upload/',
						element: el,
						// multiple: true,
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