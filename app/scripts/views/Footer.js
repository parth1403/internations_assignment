define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/footer.tpl'
], function ( $, _, Backbone, Tmpl) {

  var View = Backbone.View.extend({

      template: _.template(Tmpl),

      initialize: function (args) {

      },

      render: function(){
        me.$el.html(this.template());

        return this;
      }

  });
  return View;
});
