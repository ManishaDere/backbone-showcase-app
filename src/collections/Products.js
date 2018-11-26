var App = App || {}

App.collections.Products = Backbone.Collection.extend({
  url: 'https://opt-showcase-api.optcentral.com/products',
  model: App.models.Product,
  parse: function(response) {
  	return response.data;
  },
});