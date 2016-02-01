define([
  'jquery',
  'backbone',
  'config',
  'models/Users'
  ], function ($, Backbone, Configuration, Model) {

    var url = Configuration.services[Configuration.environment].users;
    var Collection = Backbone.Collection.extend({
        url: url,
        model: Model,

        removeUser: function(DataFactory, userModel){
          var user_id = userModel.get("user_id");
          var groupUsersCollection = DataFactory.getData("groupusers");
          groupUsersCollection.each(function(model){
            var group_id = model.get("group_id");
            var groupusers = model.get("users");
            var userIdIndex = groupusers.indexOf(user_id);
            userIdIndex > -1 && groupusers.splice(userIdIndex, 1);
            model.set("users", groupusers);
          });
          this.remove(userModel);
        },

        addUser: function(DataFactory, userModel){
          var user_id = userModel.get("user_id");
          var groupUsersCollection = DataFactory.getData("groupusers");
          groupUsersCollection.each(function(model){
            var group_id = model.get("group_id");
            var groupusers = model.get("users");
            groupusers.push(user_id);
            model.set("users", groupusers);
          });
          this.push(userModel);
        }
    });

    return Collection;
});
