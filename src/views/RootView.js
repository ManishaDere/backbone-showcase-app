var App = App || {}

App.views.RootView = Backbone.View.extend({
  el: '#root',

  // events: {
  //   'submit form': 'onSubmit',
  // },

  initialize: function() {
    _.bindAll(this, 'render');
    this.render();
  },

  render: function() {
    var self = this;
    $.get('/src/templates/root.hbs', function(templateHtml) {

      var template = Handlebars.compile(templateHtml);
      self.$el.append( template({
        title: 'My App name'
      }) );

      self.renderSidebarView();
      self.renderMainView();
      self.renderCalloutsCarouselView();

    });


  	return this;
  },

  // onUsernameChange: function(evt) {
  //   evt.preventDefault();
  //   var username = evt.target.value;
  //   console.log("username", username);
  // },

  // onSubmit: function(e) {
  //   e.preventDefault();
  //   var username = this.$el.find('[name="username"]').val();
  //   var password = this.$el.find('[name="password"]').val();

  //   $.post('/src/index.php', {
  //     username: username,
  //     password: password
  //   }, function(data, textStatus, xhr) {
  //     console.log('textStatus: textStatus');
  //     /*optional stuff to do after success */
  //   });
  // },



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