var App = App || {}

App.collections.Callouts = Backbone.Collection.extend({
  url: 'https://opt-showcase-api.optcentral.com/callouts',
  model: App.models.Callout,
  parse: function(response) {
  	return response[0].callouts;
  },
});