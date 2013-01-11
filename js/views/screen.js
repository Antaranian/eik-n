define([
	'jquery',
	'backbone'
], function($, Backbone){
	var View = Backbone.View.extend({
			events: {
				'click .resize-layout i': function(e){
					var $i = $(e.target).closest('i'),
						$target = $i.closest('.resize-layout'),
						resize = $target.data('resize');
					$('body')
						.removeAttr('class');
					if (!$i.hasClass('icon-resize-small')){
						$('body').addClass(resize);
					}
					return false;
				}		
			},
			initialize: function(){
				this.$el = $(document);
			},
		});
	return View;
});