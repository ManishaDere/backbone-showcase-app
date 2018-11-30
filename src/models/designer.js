var App = App || {}

App.models.Designer = Backbone.Model.extend({
  url: 'https://opt-showcase-api-stage.optcentral.com/brands/:_id',
  defaults: {
    _id: '',
    name: '',
  }
});

