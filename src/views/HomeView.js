var App = App || {}

App.views.HomeView = Backbone.View.extend({
  el: '#root',

  initialize: function() {
    _.bindAll(this, 'render');
    this.render();
  },

  render: function() {
    var self = this;
    $.get('/src/templates/home.hbs', function(templateHtml) {

      var template = Handlebars.compile(templateHtml);
      self.$el.html( template({
        title: 'My App name'
      }) );



      self.renderSidebarView();
      self.renderMainView();
      self.renderCalloutsCarouselView();

    });


  	return this;
  },

  renderSidebarView: function() {
    new App.views.SidebarView();
  },

  renderMainView: function() {
    new App.views.MainView();
  },

  renderCalloutsCarouselView: function() {
    new App.views.CalloutsCarouselView();
  },


});