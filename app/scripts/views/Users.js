define([
  'jquery',
  'underscore',
  'backbone',
  'backgrid',
  'views/DeleteCell',
  'views/ActionCell',
  'utils/DataFactory',
  'text!templates/users.tpl',
  'backgridfilter'
], function ( $, _, Backbone, Backgrid, DeleteCell, ActionCell, DataFactory, Tmpl) {

  var View = Backbone.View.extend({

      template: _.template(Tmpl),

      initialize: function (args) {
        var me = this;

        me.collection = DataFactory.getData("users");
      },

      render: function(){
        var me                = this,
            jEl               = $(this.template()),
            jSearchContainer  = jEl.find(".search-container"),
            jGridContainer    = jEl.find(".grid-container"),
            jBtnAddUser       = jEl.find("#add-user")
        ;

        var columns = [{
          name: "name",
          label: "Name",
          cell: "string",
          editable: false
        }, {
          name: "gender",
          label: "Gender",
          cell: "string",
          editable: false
        }, {
          name: "bdate",
          label: "Birth Date",
          cell: "string",
          editable: false
        }, {
          name: 'delete',
          label: '',
          cell: DeleteCell,
          className: 'delete',
          width: 100
        }, {
          name: 'action',
          label: '',
          className: 'action',
          cell: ActionCell,
          btn_name: 'Edit',
          btn_class: 'purple',
          btn_fa: 'fa fa-edit',
          action: function(){
            var id = this.model.get("user_id");
            Backbone.history.navigate("/edituser/" + id, true);
          },
          width: 100
        }, {
          name: 'action',
          label: '',
          cell: ActionCell,
          btn_name: 'Details',
          btn_class: 'blue-stripe',
          btn_fa: '',
          action: function(){
            var id = this.model.get("user_id");
            Backbone.history.navigate("/userdetails/" + id, true);
          },
          width: 100
        }];

        var grid = new Backgrid.Grid({
          columns: columns,
          collection: me.collection
        });

        // Render the grid
        jGridContainer.html( grid.render().el );

        // Initialize a client-side filter to filter on the client
        var filter = new Backgrid.Extension.ClientSideFilter({
          collection: this.collection,
          fields: ['name', 'gender']
        });

        // Render the filter
        jSearchContainer.html( filter.render().el );

        jBtnAddUser.on("click", function(){
          Backbone.history.navigate("/adduser", true);
        });

        $(filter.el).find("input").addClass("form-control").attr("placeholder", "Search User");

        me.$el.html(jEl);

        return this;
      },

      renderAsync: function( callback ){
        var me = this;
        DataFactory.loadData("users", function(){
          me.render();
          callback( me )
        });
      }

  });
  return View;
});
