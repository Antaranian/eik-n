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
				var data = this.model.toJSON(),
					markup = this.tpl(data);

				$('#fonts')
					.slimScroll({ scrollTo: '-5000px' });

				this.$el
					.hide()
					.html(markup)
					.prependTo('#fonts')
					.slideDown('normal');

			},
			delegate: function(){
				this.model.on('destroy', function(){
					this.remove();
				}, this);
			}
		});
	return View;
});