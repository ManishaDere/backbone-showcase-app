var App = App || {}

var base_url = '../../assets/imagesData.json';
App.collections.Products = Backbone.Collection.extend({
  url: function () {
    return base_url;
  },
  model: App.models.Item,
  parse: function(response) {
    console.log("in collection", response);
    return response;
  }

});



