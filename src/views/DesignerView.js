var App = App || {}

App.views.DesignerView = Backbone.View.extend({
  el: '#root',

  events: {
    'click a[href="#/"]': 'onCharClick'
  },

  initialize: function() {
    _.bindAll(this, 'render');
    this.collection = new App.collections.Designers();
    this.collection.fetch();
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function() {
    var self = this;
    console.log(self.collection.models, "collections fetched");
    $.get('/src/templates/designer.hbs', function(templateHtml) {

      var template = Handlebars.compile(templateHtml);
      self.$el.html( template({
        designers: self.collection.toJSON()
      }) );


    });

  	return this;
  },

  onCharClick: function(e) {
    console.log("click event");
    var self = this;
//    self.$el.find(window).scrollTop(0);
    self.$el.animate({scrollTop:0}, 'slow');
  },



});