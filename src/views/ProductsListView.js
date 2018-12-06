var App = App || {};

App.views.ProductsListView = Backbone.View.extend({
  el: '#products-list',

  events: {},

  initialize: function(options) {
    this.options = options || {};
    console.log("this.options", this.options);
    _.bindAll(this, 'render');
    this.render();
  },

  render: function() {

    var self = this;
    var products = self.options.products;
    console.log("products in render of products-list ", products);
    $.get('/src/templates/productsList.hbs', function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template({
        products: products,
      });
      self.$el.html(finalHtml);
    });
  	return this;
  },

});