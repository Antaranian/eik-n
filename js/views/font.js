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

				var $fonts = $('#fonts');
				parentHeight = $fonts.height();

				$fonts.slimScroll({ scrollTo: parentHeight + 'px' });

				console.log(parentHeight);

				this.$el
					.hide()
					.html(markup)
					.appendTo($fonts);
			},
			delegate: function(){
				this.model.on('destroy', function(){
					this.remove();
				}, this);
			},
			hide: function(){
				this.$el.slideUp('fast');
			},
			show: function(){
				this.$el.slideDown('fast');
			}
		});
	return View;
});