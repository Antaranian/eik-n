define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/alert.html'
], function($, _, Backbone, tplAlert){
	var View = Backbone.View.extend({
			tplAlert: _.template(tplAlert),
			events: {
				'click .modal .close': function(e){
					e.preventDefault();

				},
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

				this.initAlert();
				// console.log(markupAlert)
			},
			initAlert: function(){
				var $alert = $('#alert').modal({ show: false }),
					$message = $('#alert-text', $alert);

				window.alert = function(msg){
					$message.html(msg);
					$alert.modal('show');
				}
			}
		});
	return View;
});