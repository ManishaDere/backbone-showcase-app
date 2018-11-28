var App = App || {}

App.views.ProductView = Backbone.View.extend({
  el: '#root',

  events: {
  },

  initialize: function(options) {
    _.bindAll(this, 'render');
    options || (options = {});
    // options = options || {};
    // falsy values - 0, null, undefined, '' NaN
    this.model = new App.models.Product();
    this.model.set('_id', options.productId);
    this.model.fetch();
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var self = this;
    $.get('/src/templates/product.hbs', function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var compiledHtml = template({
        product: self.model.toJSON()
      })
      self.$el.html(compiledHtml);
    });
    return this;
  },

});