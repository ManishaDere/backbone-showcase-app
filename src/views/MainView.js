var App = App || {};


App.views.MainView = Backbone.View.extend({
  el: '#main',

  events: {
    'change #sort': 'sortProducts',
    'change #items-per-page': 'chooseItemsPerPage'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'doFetch');
    this.collection = new App.collections.Products();
    this.doFetch();
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
  },

  sortProducts: function(e) {
    var self = this;
    var selectedSortOption = this.$el.find("#sort option:selected").val();
    setFilters({ sort : selectedSortOption});
    this.doFetch();
  },

  chooseItemsPerPage: function() {
    var self = this;
    var selectedLimit = this.$el.find("#items-per-page option:selected").val();
    setFilters({ limit: selectedLimit});
    this.doFetch();
  },

  doFetch: function () {
    var filters = getFilters();
    this.collection.fetch({data: filters});
    console.log("doFetch ", filters);
  }



});