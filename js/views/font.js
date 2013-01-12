define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/font.html'
], function($, _, Backbone, tpl){
	var View = Backbone.View.extend({
			className: 'font',
			tagName: 'li',
			tpl: _.template(tpl),
			events: {
				'click .font-remove': function(e){
					e.preventDefault();
					e.stopPropagation();
					// console.log(this.model);
					this.model.destroy();
				}
			},
			initialize: function(model){
				this.model = model;

				this.render();
				this.delegate();
			},
			render: function(){
				var data = this.model.toJSON();
				console.log(data);
				var markup = this.tpl(data);
				this.$el
					.html(markup)
					.appendTo('#fonts');
			},
			delegate: function(){
				this.model.on('destroy', function(){
					this.remove();
				}, this);
			}
		});
	return View;
});