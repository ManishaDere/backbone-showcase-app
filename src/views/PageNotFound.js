var App = App || {}

App.views.PageNotFound = Backbone.View.extend({
  el: '#root',

  initialize: function() {
    _.bindAll(this, 'render');
    this.render();
  },

  render: function() {
    this.$el.html('<h1 class="page-not-found">Sorry, page not found</h1>');
  	return this;
  }

});