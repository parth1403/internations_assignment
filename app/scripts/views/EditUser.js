define([
  'jquery',
  'underscore',
  'backbone',
  'models/Users',
  'utils/DataFactory',
  'utils/formvalidator',
  'text!templates/edituser.tpl'
], function ( $, _, Backbone, UserModel, DataFactory, Validator, Tmpl) {

  var View = Backbone.View.extend({

    template: _.template(Tmpl),

    validators: {
      "name": "alphabet",
      "gender": "gender",
      "bdate": "date"
    },

    initialize: function (args) {
      var me = this;

      args = args || {};
      this.user_id = args.user_id;

      me.userCollection = DataFactory.getData("users");
      me.groupCollection = DataFactory.getData("groups");
      me.groupUsersCollection = DataFactory.getData("groupusers");
    },


    render: function(){
      var me          = this,
          userModel   = me.userCollection.findWhere({user_id : this.user_id}),
          user_id     = this.user_id,
          user        = userModel ? userModel.toJSON() : {
            user_id: null,
            name: null,
            bdate: null,
            gender: null
          },
          userGroupsIds   = [],
          jFormEl, data
      ;

      me.groupUsersCollection.each(function(groupusers){
        if(groupusers.get("users").indexOf(user_id) >= 0){
          var group_id = groupusers.get("group_id");
          userGroupsIds.push(group_id);
        }
      });

      data = user;
      data.usergroups = userGroupsIds;
      data.groups = me.groupCollection.toJSON();

      jEl = $(me.template(data));

      jFormEl = jEl.find("#edit-user-form")
      jFormEl.on("submit", function(e){
        e.preventDefault();
        me.onFormSubmit(e);
        return false;
      });

      me.groupSol = jEl.find('#user-groups').searchableOptionList({
        multiple: true,
        showSelectAll: false
      });

      me.$el.html(jEl);

      return this;
    },

    onFormSubmit: function(e){
      var me            = this,
          jFormEl       = me.$el.find("#edit-user-form"),
          formData      = jFormEl.serializeArray(),
          allValidField = true,
          userModel     = me.userCollection.findWhere({"user_id" : this.user_id}),
          jSelGroups    = me.groupSol.getSelection(),
          data = {}, userGroupsIds = [],
          msg
      ;

      formData      = Validator.validate( formData, me.validators );
      me.$el.find(".error").html('');

      for( var i = 0; i < formData.length; i++ ){
        var fieldData   =  formData[i],
            validField  = fieldData.name == "user-id" || fieldData.name == "user-groups" ? true : fieldData.valdata && fieldData.valdata.valid;

        allValidField = allValidField && validField;
        if(!validField){
          me.$el.find("#" + fieldData.name + "-error").html(fieldData.valdata.errorMsg);
        }

        data[fieldData.name] = fieldData.value;
      }
      if(jSelGroups.length == 0){
        me.$el.find("#group-error").html("Please at least one group.");
        allValidField = false;
      }

      if( allValidField ){

        jSelGroups.each(function(index, group){
          userGroupsIds.push(parseInt($(group).val()));
        });

        msg = "User " + data.name;
        if( userModel ){
          userModel.set(data);
          msg += " edited successfully.";
        }else{
          userModel = new UserModel();
          user_id = data.user_id = parseInt(Math.random() * 10000);
          userModel.set(data);
          me.userCollection.addUser(DataFactory, userModel);
          msg += " created successfully.";
        }

        me.$el.find(".msg-container").html("<span class='success'>" + msg + "</span>");
      }
    },



    renderAsync: function( callback ){
      var me = this;
      DataFactory.loadMultipleData(["users", "groups", "groupusers"], function(){
        me.render();
        callback( me )
      });
    },

    setUserId: function(id){
      this.user_id = id;
    }

  });

  return View;

});
