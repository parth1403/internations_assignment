define([
  'jquery',
  'backbone',
  'config',
  'models/Groups',
  'models/GroupUsers'
  ], function ($, Backbone, Configuration, Model, GroupUsersModel) {

    var url = Configuration.services[Configuration.environment].groups;
    var Collection = Backbone.Collection.extend({
        url: url,
        model: Model,

        addGroup: function(DataFactory, groupModel){
          var groupUser = new GroupUsersModel();
          groupUser.set({
            group_id: groupModel.get("group_id"),
            users: []
          });
          var groupUsersCollection = DataFactory.getData("groupusers");
          DataFactory.loadData("groupusers", function(){
            groupUsersCollection.push(groupUser);
          });

          this.push(groupModel);
        }
    });

    return Collection;
});
