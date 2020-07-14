var App = App || {}

App.views.ProgressView = Backbone.View.extend({
  el: '#root',

  events: {
  },

  initialize: function(options) {
    console.log("in initialize");
    console.log("options", options)
    _.bindAll(this, 'render');
    this.model = new App.models.Item();
    this.model.set('id', options.itemId);
    this.model.fetch();
    this.listenTo(this.model, 'sync', this.render);

    this.render();
  },



  render: function() {
    var self = this;

    $.get('/src/templates/progress.hbs', function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var compiledHtml = template({
        selectedImage: self.model.toJSON()
      })
      self.$el.html(compiledHtml);
    });
    var currentLocation = window.location;
    console.log("currentlocation", currentLocation.href);
    var actualLink = currentLocation.href;
    $('.eye-icon_visibility').hide();
    if(actualLink.includes("1")) {
      $('.eye-icon_visibility').show();
    }
    return this;
  },

});
