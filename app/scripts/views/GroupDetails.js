define([
  'jquery',
  'underscore',
  'backbone',
  'sol',
  'utils/DataFactory',
  'text!templates/groupdetails.tpl'
], function ( $, _, Backbone, sol, DataFactory, Tmpl) {

  var View = Backbone.View.extend({

    template: _.template(Tmpl),

    initialize: function (args) {
      var me = this;

      args = args || {};
      this.group_id = args.group_id;

      me.userCollection = DataFactory.getData("users");
      me.groupCollection = DataFactory.getData("groups");
      me.groupUsersCollection = DataFactory.getData("groupusers");
    },


    render: function(){
      var me              = this,
          group           = me.groupCollection.findWhere({group_id : this.group_id}),
          group_id        = this.group_id,
          groupUsersIds   = me.groupUsersCollection.findWhere({group_id: this.group_id}).get("users"),
          data, jEl, msg
      ;


      data = group.toJSON();
      data.groupusers = groupUsersIds;
      data.users = me.userCollection.toJSON();

      jEl = $(me.template(data));

      jEl.find("#save").on("click", function(e){
        e.preventDefault();
        me.onSaveClick(e);
        return false;
      });
      jEl.find("#delete").on("click", function(e){
        e.preventDefault();
        me.onDeleteClick(e);
        return false;
      });

      me.userSol = jEl.find('#groups-users').searchableOptionList({
        multiple: true,
        showSelectAll: false,
        events: {
          onChange: function(sol, changedEle){
            if( sol.getSelection().length ){
              jEl.find("#delete").attr("disabled", "disabled");
            }else{
              jEl.find("#delete").removeAttr("disabled");
            }
          }
        }
      });

      if(groupUsersIds.length){
        jEl.find("#delete").attr("disabled", "disabled");
      }else{
        jEl.find("#delete").removeAttr("disabled");
      }

      me.$el.html(jEl);

      return this;
    },

    onSaveClick: function(e){
      var me = this;
      me.saveUserChanges();
    },

    saveUserChanges: function(){
      var me              = this,
          jSelUsers       = me.userSol.getSelection(),
          groupUserIds    = [],
          groupUsersModel = me.groupUsersCollection.findWhere({"group_id": this.group_id}),
          msg
      ;

      jSelUsers.each(function(index, user){
        groupUserIds.push(parseInt($(user).val()));
      });

      groupUsersModel.set("users", groupUserIds);

      msg = "Changes are saved successfully.";
      me.$el.find(".msg-container").html("<span class='success'>" + msg + "</span>");
    },

    onDeleteClick: function(e){
      var me              = this,
          groupModel      = me.groupCollection.findWhere({"group_id": this.group_id})
      ;
      me.saveUserChanges();
      me.groupCollection.remove(groupModel);
      Backbone.history.navigate("/groups", true);
    },



    renderAsync: function( callback ){
      var me = this;
      DataFactory.loadMultipleData(["users", "groups", "groupusers"], function(){
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
