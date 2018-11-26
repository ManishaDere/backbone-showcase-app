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
      this.renderSidebar();
      // Render main
      this.renderMain();
  	});
  	return this;
  },

  renderSidebar: function() {
    App.templateManager.load('/main', function(compiledTpl) {
    });
  },

  renderMain: function() {
    App.templateManager.load('/sidebar', function(compiledTpl) {
    });
  },


});