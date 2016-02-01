define([
  'jquery',
  'underscore',
  'backbone',
  'sol',
  'utils/DataFactory',
  'text!templates/userdetails.tpl'
], function ( $, _, Backbone, sol, DataFactory, Tmpl) {

  var View = Backbone.View.extend({

    template: _.template(Tmpl),

    initialize: function (args) {
      var me = this;

      args = args || {};
      this.user_id = args.user_id;

      me.userCollection = DataFactory.getData("users");
      me.groupCollection = DataFactory.getData("groups");
      me.groupUsersCollection = DataFactory.getData("groupusers");
    },


    render: function(){
      var me              = this,
          user            = me.userCollection.findWhere({user_id : this.user_id}),
          user_id         = this.user_id,
          userGroupsIds   = [],
          data, jEl
      ;

      me.groupUsersCollection.each(function(groupusers){
        if(groupusers.get("users").indexOf(user_id) >= 0){
          var group_id = groupusers.get("group_id");
          userGroupsIds.push(group_id);
        }
      });

      data = user.toJSON();
      data.usergroups = userGroupsIds;
      data.groups = me.groupCollection.toJSON();

      jEl = $(me.template(data));

      jEl.find("#save").on("click", function(e){
        e.preventDefault();
        me.onSaveClick(e);
        return false;
      });

      me.groupSol = jEl.find('#user-groups').searchableOptionList({
        multiple: true,
        showSelectAll: false
      });

      me.$el.html(jEl);

      return this;
    },

    onSaveClick: function(e){
      var me              = this,
          jSelGroups      = me.groupSol.getSelection(),
          user_id         = this.user_id,
          userGroupsIds   = [],
          msg
      ;

      jSelGroups.each(function(index, group){
        userGroupsIds.push(parseInt($(group).val()));
      });

      me.groupUsersCollection.each(function(model){
        var group_id = model.get("group_id");
        var groupusers = model.get("users");
        var userIdIndex = groupusers.indexOf(user_id);
        userIdIndex > -1 && groupusers.splice(userIdIndex, 1);
        if(userGroupsIds.indexOf(group_id) > -1){
          groupusers.push(user_id);
        }
        model.set("users", groupusers);
      });

      msg = "Changes are saved successfully.";
      me.$el.find(".msg-container").html("<span class='success'>" + msg + "</span>");
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
