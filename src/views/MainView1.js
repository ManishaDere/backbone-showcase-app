var App = App || {};

App.views.MainView1 = Backbone.View.extend({
  el: '#main',

  events: {
    'change #sort': 'sortProducts',
    'click .page': 'pageNumberClicked',
    'change #items-per-page': 'chooseItemsPerPage'
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
    var appliedFilters = App.helpers.getFilters();

    $.get('/src/templates/products.hbs', function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template({
        products: products,
        totalCount: self.collection.totalCount,
      });
      self.$el.html(finalHtml);
      self.renderPaginationView();
    });
  	return this;
  },

  sortProducts: function(e) {
    var selectedSortOption = this.$el.find("#sort option:selected").val();
    App.helpers.setFilters({
      sort: selectedSortOption
    });
    App.eventBus.trigger('GET_PRODUCTS', {
      sort: selectedSortOption
    });
  },

  chooseItemsPerPage: function() {
    var selectedLimit = this.$el.find("#items-per-page option:selected").val();
    App.helpers.setFilters({
      limit: selectedLimit
    });
    App.eventBus.trigger('GET_PRODUCTS', {
      limit: selectedLimit
    })
  },

  renderPaginationView: function() {
    new App.views.PaginationView();
  }


});