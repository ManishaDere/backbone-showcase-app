// Global configurations
Handlebars.logger.level = 0;



var App = {
	models: {},
	collections: {},
	views: {},
};;/*
  TemplateManager class
  Load & cache Handlebars template over ajax
*/

var App = App || {};

var TemplateManager = (function() {
  var cache, defaults, fetchAndCache;

  defaults = {
    path: '/src/templates',
    ext: '.hbs'
  };

  cache = {};

  function TemplateManager(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, defaults);
    if (this.options.cache) {
      cache = this.options.cache;
    }
  }

  TemplateManager.prototype.load = function(tpl, callback) {

    if (_.has(cache, tpl)) {
      return callback(cache[tpl]);
    }
    tpl = fetchAndCache.apply(this, [tpl, callback]);
    if (!callback) {
      return tpl;
    }
    return tpl.done(function(tplString) {
      if (callback) {
        return callback(tplString);
      }
    });
  };

  fetchAndCache = function(tpl, callback) {
    var deferred, tplPath,
      _this = this;
    deferred = new $.Deferred();
    tplPath = "" + this.options.path + tpl + this.options.ext;
    $.ajax({
      url: tplPath,
      type: 'GET',
      dataType: 'text',
      cache: true,
      success: function(tplString) {
        cache[tpl] = Handlebars.compile(tplString)
        cache[tpl].tplString = tplString;
        return deferred.resolve(cache[tpl]);
      }
    });
    return deferred;
  };

  return TemplateManager;

})();

// Intitalize template manager
App.templateManager = new TemplateManager();
;var App = App || {}

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
});;var App = App || {}

App.collections.Products = Backbone.Collection.extend({
  url: 'https://opt-showcase-api.optcentral.com/products',
  model: App.models.Product,
  parse: function(response) {
  	return response.data;
  },
});;var App = App || {}

App.views.MainView = Backbone.View.extend({
  el: '#main',

  initialize: function() {
    _.bindAll(this, 'render');
    this.collection = new App.collections.Products();
    this.collection.fetch();

    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function() {
    if (!this.collection.length) {
      this.$el.append('<div class="alert alert-info">Product(s) not found.</div>');
      return this;
    }

    var products = this.collection.toJSON();
    var self = this;

    $.get('/src/templates/products.hbs', function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template({
        products: products
      });
      self.$el.append(finalHtml);
    });

  	return this;
  }

});;var App = App || {}

App.views.RootView = Backbone.View.extend({
  el: '#root',

  events: {
    'submit form': 'onSubmit'
  },

  initialize: function() {
    _.bindAll(this, 'render');
    this.render();
  },

  render: function() {
    var self = this;
    $.get('/src/templates/root.hbs', function(templateHtml) {

      var template = Handlebars.compile(templateHtml);
      self.$el.append( template({
        title: 'My App name'
      }) );

      // self.renderSidebar();
      self.renderMainView();

    });


  	return this;
  },

  onSubmit: function(e) {
    e.preventDefault();
    var username = this.$el.find('[name="username"]').val();
    var password = this.$el.find('[name="password"]').val();

    $.post('/src/index.php', {
      username: username,
      password: password
    }, function(data, textStatus, xhr) {
      console.log('textStatus: textStatus');
      /*optional stuff to do after success */
    });
  },

  renderSidebarView: function() {
  },

  renderMainView: function() {
    new App.views.MainView();
  },


});;var App = App || {}

App.views.SidebarView = Backbone.View.extend({
  el: '#sidebar',

  className: 'aside',

  events: {},

  initialize: function() {
    _.bindAll(this, 'render');
		console.log('App.SidebarView constructor called', this);
    this.render();
  },

  render: function() {
    var self = this;
  	App.templateManager.load('/sidebar', function(compiledTpl) {
  		self.el.innerHTML = compiledTpl({
        title: 'My SidebarView'
      });
  	});
  	return this;
  }

});;;(function(){

	$( document ).ready(function() {
		new App.views.RootView()
	});

})(jQuery); // IIFE