var App = App || {}

App.views.FilterByDropdownView = Backbone.View.extend({
  el: '#filter-by-dropdown',

  events: {
    'click #filter-by-price-dropdown': 'filterByPriceDropdown',
    'click .price-range-selected': 'priceRangeSelected'
  },

  initialize: function() {
    _.bindAll(this, 'render');

    this.render();
  },

  render: function() {
    var self = this;
    var options = {
                    selected: 232322,
                    items: [
                              {
                                name: 'Less than $6000',
                                price_min:0,
                                price_max:6000,
                                id: 232322
                              },
                              {
                                name: '$6000 to $10000',
                                price_min:6000,
                                price_max:10000,
                                id: 1000
                              },
                              {
                                name: 'More than $10000',
                                price_min:10000,
                                price_max:100000,
                                id: 12122
                              }
                            ]
                  }
    $.get('/src/templates/filterby-dropdown.hbs', function(templateHtml) {

      var template = Handlebars.compile(templateHtml);
      self.$el.html( template({
        options: options
      }) );


    });


  	return this;
  },

  filterByPriceDropdown: function() {
    console.log("filterByPriceDropdown called");
    var havingClass = this.$el.find('#filter-by-price-dropdown > i').hasClass('fa-angle-down');
    if(havingClass) {
      this.$el.find('#filter-by-price-dropdown > i').removeClass('fa-angle-down');
      this.$el.find('#filter-by-price-dropdown > i').addClass('fa-angle-up');
      this.$el.find('#filter-by-price-dropdown').removeClass('default-filter-style');
      this.$el.find('#filter-by-price-dropdown').addClass('clickDropdown-filter-style')
      this.$el.find('ul').addClass('dropdown-menu-changed');
    } else {
      this.$el.find('#filter-by-price-dropdown > i').removeClass('fa-angle-up');
      this.$el.find('#filter-by-price-dropdown > i').addClass('fa-angle-down');
      this.$el.find('#filter-by-price-dropdown').removeClass('clickDropdown-filter-style');
      this.$el.find('#filter-by-price-dropdown').addClass('default-filter-style');
    }
  },

  priceRangeSelected: function() {
    console.log("priceRangeSelected ");
  }


});