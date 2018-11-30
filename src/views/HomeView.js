var App = App || {}

App.views.HomeView = Backbone.View.extend({
  el: '#root',

  events: {
    'submit form': 'onSubmit',
  },

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

  onSubmit: function(e) {
    e.preventDefault();
    var username = this.$el.find('[name="username"]').val();
    var password = this.$el.find('[name="password"]').val();

    $.post('/src/index.php', {
      username: username,
      password: password
    }, function(data, textStatus, xhr) {
      console.log('textStatus: textStatus');
      /*optional stuff to do after success */
    });
  },

  onCharClick: function (e) {
    console.log("click event");
    var self = this;
    self.$el.find(window).scrollTop(0);
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