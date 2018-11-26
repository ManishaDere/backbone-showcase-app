var App = App || {}

App.RootView = Backbone.View.extend({
  el: '#root',

  className: 'container',

  events: {},

  initialize: function() {
    _.bindAll(this, 'render');
    this.render();
  },

  render: function() {
    var self = this;
  	App.templateManager.load('/root', function(compiledTpl) {
  		self.el.innerHTML = compiledTpl({
        title: 'My App name'
      });

      // Render sidebar
      // Render main

  	});
  	return this;
  }

});