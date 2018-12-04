var App = App || {}

var base_url = 'https://opt-showcase-api.optcentral.com/products';
App.collections.Products = Backbone.Collection.extend({
  url: function () {
  	return base_url;
  },
  model: App.models.Product,
  parse: function(response) {
  	return response.data;
  },

});


//collection.fetch({ data: $.param({ page: 1}) });
/*collection.fetch({
    data: { page: 1 },
    processData: true
});
*/