var App = App || {}

App.views.SidebarView = Backbone.View.extend({
  el: '#sidebar',

  events: {},

  initialize: function() {
    _.bindAll(this, 'render');
		console.log('App.SidebarView constructor called', this);
    this.render();
  },

  render: function() {

    var self = this;
    $.get('/src/templates/sidebar.hbs', function(templateHtml) {

      var template = Handlebars.compile(templateHtml);
      self.$el.append( template({
        title: 'My SidebarView'
      }) );

    });

  	return this;
  }

});