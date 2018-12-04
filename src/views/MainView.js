var App = App || {};


App.views.MainView = Backbone.View.extend({
  el: '#main',

  events: {
    'change #sort': 'sortProducts',
    'change #items-per-page': 'chooseItemsPerPage',
    'click .page': 'pageClicked'
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

    this.doFetch();
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function() {

    var self = this;
    var products = self.collection.toJSON();
    var appliedFilters = App.helpers.getFilters();

    $.get('/src/templates/products.hbs', function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template({
        products: products,
        currentCount: self.collection.currentCount,
        totalCount: self.collection.totalCount,
        // nextPage: self.next
      });
      self.$el.html(finalHtml);


      var paginationHtml = '';
      var numberOfPages = self.collection.totalCount / appliedFilters.limit;
      for(var i=1; i<= numberOfPages; i++) {
        paginationHtml += (
          '<li class="page-item">' +
          '<a class="page page-link" href="#" data-page=' + i + '>' + i + '</a>' +
          '</li>'
        );
      }
      self.$el.find('#products-pagination').append(
        '<ul class="pagination">' +
          paginationHtml +
        '</ul>'
      );

    });
  	return this;
  },

  sortProducts: function(e) {
    var selectedSortOption = this.$el.find("#sort option:selected").val();
    App.helpers.setFilters({ sort : selectedSortOption});
    this.doFetch();
  },

  chooseItemsPerPage: function() {
    var selectedLimit = this.$el.find("#items-per-page option:selected").val();
    App.helpers.setFilters({ limit: selectedLimit});
    this.doFetch();
  },

  pageClicked: function (e) {
    console.log("pageClicked ");
    var nextpage = $(e.currentTarget).data('page');
    console.log("nextpage ", nextpage);
    App.helpers.setFilters({page: nextpage});
    this.doFetch();
  },

  doFetch: function () {
    var filters = App.helpers.getFilters();
    this.collection.fetch({data: filters});
    console.log("doFetch ", filters);
  }



});