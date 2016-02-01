define([
  'underscore',
  'backbone',
  'collections/Users',
  'collections/Groups',
  'collections/GroupUsers'
], function ( _, Backbone, UsersCollection, GroupsCollection, GroupUsersCollection) {


  var DataFactory = {

    dataload_promises: {},

    getData: function( type ){
      switch( type ){
        case "users":
          if( !this.usersCollection ){
            this.usersCollection = new UsersCollection();
          }
          return this.usersCollection;
          break;
        case "groups":
          if( !this.groupsCollection ){
            this.groupsCollection = new GroupsCollection();
          }
          return this.groupsCollection;
          break;
        case "groupusers":
          if( !this.groupUsersCollection ){
            this.groupUsersCollection = new GroupUsersCollection();
          }
          return this.groupUsersCollection;
          break;
      }
    },

    loadData: function( type, callback ){
      var promise = this.fetchData(type);
      promise.then( function(collection){
        callback(collection);
      });
    },

    loadMultipleData: function( types, callback ){
      var promies = [];
      for( var i = 0; i < types.length; i++ ){
        promies.push(this.fetchData(types[i]));
      }
      Promise.all(promies).then(function(collections) {
        callback(collections);
      });
    },

    fetchData: function(type){
      var collection = this.getData(type);
      var promise = this.dataload_promises[type];
      if(!promise){
        promise = this.dataload_promises[type] = new Promise(
          function(resolve, reject) {
            collection.fetch({
                success: function(){
                    // me.loader.Hide();
                    resolve(collection);
                },
                error: function(){
                    // me.loader.Hide();
                    reject(collection);
                }
            });
        });
      }
      return promise;
    }
  }

  return DataFactory;

});
