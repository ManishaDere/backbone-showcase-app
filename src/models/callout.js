var App = App || {}

App.models.Callout = Backbone.Model.extend({
  url: 'https://opt-showcase-api.optcentral.com/callouts/:_id',
  defaults: {
    _id: '',
    desktop_image: "",
  }
});