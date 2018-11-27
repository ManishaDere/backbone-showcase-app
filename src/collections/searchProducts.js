var App = App || {}

App.collections.searchProducts = Backbone.Collection.extend({
  url: 'https://optqa.optcentral.com/optportal/catalog/',
  model: App.models.searchProduct,
  parse: function(response) {
  	return response.data;
  },
});