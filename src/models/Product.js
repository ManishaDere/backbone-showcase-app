var App = App || {}

App.models.Product = Backbone.Model.extend({
  url: 'https://opt-showcase-api.optcentral.com/products/:id',
  defaults: {
    id: null,
    title: '',
    sku: null,
    status: 'Active',
    pricing: null,
    pricing: null,
    images: [],
    attributes: {},
  }
});