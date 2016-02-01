define([
  'jquery',
  'underscore',
  'backbone'
], function ( $, _, Backbone) {

  var View = Backbone.View.extend({

        childViews: [],

        initialize: function (args) {

        },


        render: function(){
          var me          = this,
              childViews  = me.childViews;


          // if( me.oldChildViews ){
          //   me.destroyChildViews( me.oldChildViews );
          //   me.oldChildViews = null;
          // }

          me.$el.html('');

          for( var i = 0; i < childViews.length; i++ ){
            childViews[i].renderAsync(function( view ){
              me.$el.append( view.el );
            });
          }

          return this;
        },

        setChildViews: function( childViews, forceRender ){
          var me = this;

          me.oldChildViews = me.childViews;
          me.childViews = childViews;
          if( forceRender ){
            me.render();
          }
        },

        destroyChildViews: function( childViews ){
          var me = this,
              view;
          for( var i = 0; i < childViews.length; i++ ){
            view = childViews[i];
            if(typeof view.destroy == "function"){
              view.destroy();
            }
          }
        }

    });
    return View;


});
