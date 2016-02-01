define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/header.tpl'
], function ( $, _, Backbone, Tmpl) {

  var View = Backbone.View.extend({

      template: _.template(Tmpl),

      initialize: function (args) {
        var me = this;
        me.render();
      },

      render: function(){
        var me          = this,
            jEl         = $(me.template()),
            usersBtn    = jEl.find("#btn-users"),
            groupsBtn   = jEl.find("#btn-groups");

        usersBtn.on('click', function(){
          Backbone.history.navigate("/users", true);
        });
        groupsBtn.on('click', function(){
          Backbone.history.navigate("/groups", true);
        });

        me.$el.html(jEl);

        return this;
      }

  });
  return View;
});
