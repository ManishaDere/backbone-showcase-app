var App = App || {};

App.views.TopActionsBarView = Backbone.View.extend({
  el: '#top-actions-bar',

  events: {
    'change #sort': 'sortProducts',
    'change #items-per-page': 'chooseItemsPerPage',
    'click #list-view': 'chooseListView',
    'click #two-grid-view': 'chooseTwoGridView',
    'click #three-grid-view': 'chooseThreeGridView'
  },

  initialize: function(options) {
    this.options = options || {};
    _.bindAll(this, 'render');
    console.log("options in topActionsBar ", options)
    this.render();
  },

  render: function() {

    var self = this;
    console.log("options", self.options);

    $.get('/src/templates/topActionsBar.hbs', function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template({
        totalCount: self.options.totalCount,
      });
      self.$el.html(finalHtml);
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

  chooseListView: function() {
    App.eventBus.trigger('GRID_UPDATE', {
      viewSelected: 'col-12'
    });
  },

  chooseTwoGridView: function() {
    App.eventBus.trigger('GRID_UPDATE', {
      viewSelected: 'col-6'
    });
  },

  chooseThreeGridView: function() {
    App.eventBus.trigger('GRID_UPDATE', {
      viewSelected: 'col-4'
    });
  }

});