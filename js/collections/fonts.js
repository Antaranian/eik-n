define([
	'jquery',
	'backbone',
	'views/toolbox',
	'views/fonts',
	'models/font'
], function($, Backbone, Toolbox, FontsView, Font) {
	// console.log();
	var Collection = Backbone.Collection.extend({
			url: '/api/fonts',
			model: Font,
			initialize: function(){
				// console.log(this);
				this.view = new FontsView(this);
				this.toolbox = new Toolbox(this);

				this.delegate();
			},
			delegate: function(){

			}
		});
	return Collection;
});