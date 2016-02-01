define([
  'jquery',
  'underscore',
  'backbone',
  'models/Groups',
  'utils/DataFactory',
  'utils/formvalidator',
  'text!templates/editgroup.tpl'
], function ( $, _, Backbone, UserModel, DataFactory, Validator, Tmpl) {

  var View = Backbone.View.extend({

    template: _.template(Tmpl),

    validators: {
      "name": "alphabet"
    },

    initialize: function (args) {
      var me = this;

      args = args || {};
      this.group_id = args.group_id;

      me.collection = DataFactory.getData("groups");
    },


    render: function(){
      var me          = this,
          groupModel  = me.collection.findWhere({group_id : this.group_id}),
          group       = groupModel ? groupModel.toJSON() : {
            group_id: null,
            name: null
          },
          jEl     = $(this.template(group)),
          jFormEl = jEl.find("#edit-group-form")
      ;

      jFormEl.on("submit", function(e){
        e.preventDefault();
        me.onFormSubmit(e);
        return false;
      });
      me.$el.html(jEl);

      return this;
    },

    onFormSubmit: function(e){
      var me            = this,
          jFormEl       = me.$el.find("#edit-group-form"),
          formData      = jFormEl.serializeArray(),
          formData      = Validator.validate( formData, me.validators ),
          allValidField = true,
          groupModel    = me.collection.findWhere({group_id : this.group_id}),
          data = {},
          msg
      ;

      for( var i = 0; i < formData.length; i++ ){
        var fieldData   =  formData[i],
            validField  = fieldData.name == "group-id" ? true : fieldData.valdata && fieldData.valdata.valid;

        allValidField = allValidField && validField;
        if(!validField){
          me.$el.find("#" + fieldData.name + "-error").html(fieldData.valdata.errorMsg);
        }

        data[fieldData.name] = fieldData.value;
      }

      if( allValidField ){
        msg = "Group " + data.name;

        if( groupModel ){
          groupModel.set(data);
          msg += " edited successfully.";
        }else{
          groupModel = new GroupModel();
          groupModel.set(data);
          me.collection.push(groupModel);
          msg += " created successfully.";
        }

        me.$el.find(".msg-container").html("<span class='success'>" + msg + "</span>");
      }
    },



    renderAsync: function( callback ){
      var me = this;
      DataFactory.loadData("groups", function(){
        me.render();
        callback( me )
      });
    },

    setGroupId: function(id){
      this.group_id = id;
    }

  });

  return View;

});
