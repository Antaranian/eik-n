define([
	'jquery',
	'backbone',
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
				}			
			},
			initialize: function(model){
				this.model = model;

				this.$el = $('#container');

				// this.uploadify();
				// this.delegate();
			}
		});
	return View;
});