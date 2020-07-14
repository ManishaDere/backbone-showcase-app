var App = App || {}

App.models.Item = Backbone.Model.extend({
  url: function() {
    console.log("in model", '../../assets/imagesData.json');
    return '../../assets/imagesData.json';
  },
  defaults: {
    id: null,
  }
});
