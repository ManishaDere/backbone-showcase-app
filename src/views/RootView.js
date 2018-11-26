var App = App || {}

App.views.RootView = Backbone.View.extend({
  el: '#root',

  events: {
    'submit form': 'onSubmit'
  },

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

      // self.renderSidebar();
      // self.renderMain();

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

  renderSidebar: function() {
  },

  renderMain: function() {
  },


});