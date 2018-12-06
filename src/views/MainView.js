var App = App || {};

App.views.MainView = Backbone.View.extend({
  el: '#main',

  events: {
  },

  initialize: function() {
    _.bindAll(this, 'render', 'doFetch');
    this.collection = new App.collections.Products();
    // Set inital filters
    App.helpers.setFilters({
      page: 1,
      limit: 24,
      sort: 'pricing.retail;desc'
    });

    App.eventBus.on('GET_PRODUCTS', (function(eventData) {
      console.log('GET_PRODUCTS event fired with data ', eventData);
      this.doFetch();
    }).bind(this));

    App.eventBus.trigger('GET_PRODUCTS');
    this.listenTo(this.collection, 'sync', this.render);
  },


  doFetch: function () {
    var filters = App.helpers.getFilters();
    this.collection.fetch({data: filters});
    console.log("doFetch ", filters);
  },

  render: function() {

    var self = this;
    var products = self.collection.toJSON();

    $.get('/src/templates/main.hbs', function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template();
      self.$el.html(finalHtml);
      self.renderTopActionsBarView();
      self.renderProductsListView();
      self.renderPaginationView();
    });
  	return self;
  },


  renderTopActionsBarView: function () {
    new App.views.TopActionsBarView({
      totalCount: this.collection.totalCount
    });
    console.log("renderTopActionsBarView initialized");
    console.log("this.collection.totalCount", this.collection.totalCount);
  },

  renderProductsListView: function() {
    new App.views.ProductsListView({
      products: this.collection.toJSON()
    });
    console.log("renderProductsListView initialized");
    console.log("this.collection", this.collection.toJSON());
  },

  renderPaginationView: function() {
    new App.views.PaginationView({
      totalCount: this.collection.totalCount
    });
    console.log("renderPaginationView initialized");
    console.log("this.collection.totalCount", this.collection.totalCount);
  }





});