var App = App || {};

App.views.PaginationView = Backbone.View.extend({
  el: '#products-pagination',

  events: {
    'click .page': 'pageNumberClicked',
  },

  initialize: function(options) {
    this.options = options || {};
    console.log("paginationView options", this.options);
    _.bindAll(this, 'render');
    this.render();
  },

  render: function () {
    var self = this;

    var appliedFilters = App.helpers.getFilters();
    var paginationHtml = '';
    var numberOfPages = self.options.totalCount / appliedFilters.limit;

    $.get('/src/templates/home.hbs', function(templateHtml) {

      for(var i=1; i<= numberOfPages; i++) {
        paginationHtml += (
          '<li class="page-item">' +
          '<a class="page page-link" href="#" data-page=' + i + '>' + i + '</a>' +
          '</li>'
        );
      }
      var template = Handlebars.compile(templateHtml);
      self.$el.html(template());

      var finalPagination = '<ul class="pagination">' + paginationHtml + '</ul>';
      self.$el.html(finalPagination);

    });
    return this;
  },

  pageNumberClicked: function (e) {
    var nextPage = $(e.currentTarget).data('page');
    App.helpers.setFilters({
      page: nextPage
    });
    App.eventBus.trigger('GET_PRODUCTS', {
      page: nextPage
    })
  },
});
