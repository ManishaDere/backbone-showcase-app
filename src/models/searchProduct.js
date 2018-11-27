var App = App || {}

App.models.searchProduct = Backbone.Model.extend({
  url: 'https://optqa.optcentral.com/optportal/catalog/:id',
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