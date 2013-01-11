define([
	'jquery',
	'underscore',
	'backbone',
	'scroll'
], function($, _, Backbone){
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
			},
			delegate: function(){
			}
		});
	return View;
});