var App = App || {};

App.Router = Backbone.Router.extend({

	routes: {
		'': 'homeView', // #/
    'ajaffetest/:itemId': 'progressView',
    'product/:productId': 'productView',  // #/product/1223
    'brands/': 'designerView',
    '*actions': 'pageNotFound',  // #/xyz
  },

	initialize: function(options) {
	},

  pageNotFound: function() {
    new App.views.PageNotFound();
  },

  homeView: function() {
    new App.views.HomeView();
  },

  productView: function(productId) {
    new App.views.ProductView({
      productId: productId
    });
  },

  designerView: function() {
    new App.views.DesignerView();
  },

  progressView: function(itemId) {
	  console.log("in progress routes", itemId)
	  new App.views.ProgressView({
      itemId: itemId
    });
  }

});

