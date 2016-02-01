define([
  'backbone',
  'views/Header',
  'views/Footer',
  'views/Body',
  'views/Users',
  'views/Groups',
  'views/EditUser',
  'views/EditGroup',
  'views/UserDetails',
  'views/GroupDetails'
], function (Backbone, Header, Footer, Body, Users, Groups, EditUser, EditGroup, UserDetails, GroupDetails) {

  var Router = Backbone.Router.extend({

    container: null,
    header: null,
    body: null,
    footer: null,
    usersView: null,
    groupsView: null,
    editUserView: null,
    editGroupView: null,

    initialize: function() {
        this.header = new Header( { el : $(".header") });
        this.body = new Body( { el : $(".body") });
        this.footer = new Footer( { el : $(".footer") });
    },

    routes: {
        "": "showUsers",
        "users": "showUsers",
        "groups": "showGroups",
        "edituser/:id": "editUser",
        "editgroup/:id": "editGroup",
        "adduser": "editUser",
        "addgroup": "editGroup",
        "userdetails/:id": "userDetails",
        "groupdetails/:id": "groupDetails"
    },

    showUsers: function () {
      if (this.usersView == null) {
          this.usersView = new Users();
      }
      this.body.setChildViews( [this.usersView] );
      this.body.render();
    },

    showGroups: function () {
      if (this.groupsView == null) {
          this.groupsView = new Groups();
      }
      this.body.setChildViews( [this.groupsView] );
      this.body.render();
    },

    editUser: function ( userId ) {
      if (this.editUserView == null) {
          this.editUserView = new EditUser();
      }
      this.editUserView.setUserId( parseInt(userId) );
      this.body.setChildViews( [this.editUserView] );
      this.body.render();
    },

    editGroup: function ( groupId ) {
      if (this.editGroupView == null) {
          this.editGroupView = new EditGroup();
      }
      this.editGroupView.setGroupId( parseInt(groupId) );
      this.body.setChildViews( [this.editGroupView] );
      this.body.render();
    },

    userDetails: function( userId ){
      if (this.userDetailView == null) {
          this.userDetailView = new UserDetails();
      }
      this.userDetailView.setUserId( parseInt(userId) );
      this.body.setChildViews( [this.userDetailView] );
      this.body.render();
    },

    groupDetails: function( groupId ){
      if (this.groupDetailView == null) {
          this.groupDetailView = new GroupDetails();
      }
      this.groupDetailView.setGroupId( parseInt(groupId) );
      this.body.setChildViews( [this.groupDetailView] );
      this.body.render();
    }
  });

  return Router;
});
