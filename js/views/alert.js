define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/alert.html'
], function($, _, Backbone, tpl){
	var View = Backbone.View.extend({
			tpl: _.template(tpl),
			initialize: function(model){
				this.model = model;
				this.$el = $('#alerts .container');
			},
			render: function(type, message){
				var markup = this.tpl({ type: type, text: message });

				$(markup)
					.appendTo(this.$el)
					.slideDown('normal')
					.delay(2500)
					.slideUp('normal', function(){
						$(this).remove();
					});
			}
		});
	return View;
});