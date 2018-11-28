var App = App || {}

App.views.MainView = Backbone.View.extend({
  el: '#main',

  initialize: function() {
    _.bindAll(this, 'render');
    this.collection = new App.collections.Products();
    this.collection.fetch();
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function() {

    var products = this.collection.toJSON();
    var self = this;

    $.get('/src/templates/products.hbs', function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template({
        products: products
      });
      self.$el.html(finalHtml);
    });

  	return this;
  }

});