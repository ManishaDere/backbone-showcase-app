var App = App || {}

App.views.SidebarView = Backbone.View.extend({
  el: '#sidebar',

  events: {
    'click #reset-filter-btn': 'resetFilters',
    'click #search-btn': 'searchByText',
    'click #go-btn': 'searchByPrice',
    'click a[href="#collapse-shop-by-categories"]': 'shopByCategories',
    'click .category-checkbox': 'categorySelectedClick'
  },

  initialize: function() {
    var self = this;
    _.bindAll(this, 'render');
    $.ajax({
      type: "GET",
      url: 'https://opt-showcase-api-stage.optcentral.com/categories?status=Active&visibility=LEFT&showcase=OOO',
      dataType: "json",
      success: function(response){
        var that = self;
        that.render(response);
      }
    });

  },

  render: function(options) {

    var self = this;
    $.get('/src/templates/sidebar.hbs', function(templateHtml) {

      var template = Handlebars.compile(templateHtml);
      self.$el.append( template({
        options:options
      }) );

    });

  	return this;
  },

  resetFilters: function() {

    $("input").val("");
    localStorage.removeItem('filters');
    App.helpers.setFilters({
      page: 1,
      limit: 24,
      sort: 'pricing.retail;desc'
    });
    App.eventBus.trigger('GET_PRODUCTS', {
      page: 1,
      limit: 24,
      sort: 'pricing.retail;desc'
    })
  },

  searchByText: function() {
    var searchByTextVal = this.$el.find('#srch-by-keyword').val();
    console.log("searchByText ", searchByTextVal);
    App.helpers.setFilters({
      search: searchByTextVal
    });
    App.eventBus.trigger('GET_PRODUCTS', {
      search: searchByTextVal
    })
  },

  searchByPrice: function() {
    var price_min = this.$el.find('#min-price').val();
    var price_max = this.$el.find('#max-price').val();
    App.helpers.setFilters({
      price_min: price_min,
      price_max: price_max
    });
    App.eventBus.trigger('GET_PRODUCTS', {
      price_min: price_min,
      price_max: price_max
    })
  },

  shopByCategories: function() {
    console.log("shopByCategories function called");
    var havingClass = this.$el.find('.accordion i').hasClass('fa-plus');
    console.log("havingClass=> ", havingClass);
    if(havingClass) {
      this.$el.find('.accordion i').removeClass('fa-plus').addClass('fa-minus');
    } else {
      this.$el.find('.accordion i').removeClass('fa-minus').addClass('fa-plus');
    }
  },

  categorySelectedClick: function(e) {

    var val = [];
    $(':checkbox:checked').each(function(i){
      val[i] = $(this).val();
    });
    console.log("categorySelectedClick =>", val);
    App.helpers.setFilters({
      categories: val
    });
    App.eventBus.trigger('GET_PRODUCTS', {
      categories: val
    })
  }

});