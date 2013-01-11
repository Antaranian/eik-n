define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone, tpl){
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
			},
			delegate: function(){

			}
		});
	return View;
});