var App = App || {}

App.models.Product = Backbone.Model.extend({
  url: function() {
    return 'https://opt-showcase-api.optcentral.com/products/' + this.get('_id');
  },
  defaults: {
    _id: null,
    title: '',
    sku: null,
    status: 'Active',
    pricing: null,
    images: []
  }
});

//+ this.get('_id') + '/'
////+ this.get('limit') + '/' + this.get('page') + '/' + this.get('sort');