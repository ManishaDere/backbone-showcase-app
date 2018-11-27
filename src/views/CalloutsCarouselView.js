var App = App || {}

App.views.CalloutsCarouselView = Backbone.View.extend({
  el: '#calloutCarousel',

  initialize: function() {
    _.bindAll(this, 'render');
    this.collection = new App.collections.Callouts();
    this.collection.fetch();
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function() {

    var self = this;
    var callouts = this.collection.toJSON();

    $.get('/src/templates/calloutsCarousel.hbs', function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template({
        callouts: callouts
      });
      self.$el.append(finalHtml);
      self.$el.slick();
    });

  	return this;
  }

});