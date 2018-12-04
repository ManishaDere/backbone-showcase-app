var App = App || {}

var base_url = 'https://opt-showcase-api.optcentral.com/callouts/';
App.models.Callout = Backbone.Model.extend({
  url: function() {
    return base_url + this.get('_id');
  },
  defaults: {
    _id: '',
    desktop_image: "",
  }
});