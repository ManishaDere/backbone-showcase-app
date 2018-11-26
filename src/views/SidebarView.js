var App = App || {}

App.views.SidebarView = Backbone.View.extend({
  el: '#sidebar',

  className: 'aside',

  events: {},

  initialize: function() {
    _.bindAll(this, 'render');
		console.log('App.SidebarView constructor called', this);
    this.render();
  },

  render: function() {
    var self = this;
  	App.templateManager.load('/sidebar', function(compiledTpl) {
  		self.el.innerHTML = compiledTpl({
        title: 'My SidebarView'
      });
  	});
  	return this;
  }

});