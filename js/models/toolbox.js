define([
	'jquery',
	'underscore',
	'backbone',
	'views/toolbox'
], function($, _, Backbone, ToolboxView) {
	var Model = Backbone.Model.extend({
			initialize: function(){
				this.view = new ToolboxView(this);
			}
		});
	return Model;
});