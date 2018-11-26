var App = {
	models: {},
	collecions: {},
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

App.RootView = Backbone.View.extend({
  el: '#root',

  className: 'container',

  events: {},

  initialize: function() {
    _.bindAll(this, 'render');
    this.render();
  },

  render: function() {
    var self = this;
  	App.templateManager.load('/root', function(compiledTpl) {
  		self.el.innerHTML = compiledTpl({
        title: 'My App name'
      });

      // Render sidebar
      // Render main

  	});
  	return this;
  }

});;var App = App || {}

App.SidebarView = Backbone.View.extend({
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
		new App.RootView()
	});

})(jQuery); // IIFE