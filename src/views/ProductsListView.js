var App = App || {};

App.views.ProductsListView = Backbone.View.extend({
  el: '#products-list',

  events: {},

  initialize: function(options) {
    this.options = options || {};
    console.log("this.options", this.options);
    _.bindAll(this, 'render', 'selectView');

    App.eventBus.on('GRID_UPDATE', (function(eventData) {
      this.selectView(eventData);
    }).bind(this));

    App.eventBus.trigger('GRID_UPDATE');

    this.render();
  },

  selectView: function(eventData) {
    console.log("eventData ", eventData);

    if ( this.$el.find('.product').hasClass('col-4') ) {

      this.$el.find('.product').removeClass('col-4');

    } else if(this.$el.find('.product').hasClass('col-6')) {

      this.$el.find('.product').removeClass('col-6');

    } else if(this.$el.find('.product').hasClass('col-12')) {

      this.$el.find('.product').removeClass('col-12');

    }

    if(eventData) {
      var viewSelected = eventData.viewSelected;
      this.$el.find('.product').addClass(viewSelected);
    }

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