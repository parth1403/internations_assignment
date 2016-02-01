define([
  'jquery',
  'underscore',
  'backbone',
  'backgrid',
  'views/ActionCell',
  'utils/DataFactory',
  'text!templates/groups.tpl',
  'backgridfilter'
], function ( $, _, Backbone, Backgrid, ActionCell, DataFactory, Tmpl) {

  var View = Backbone.View.extend({

      template: _.template(Tmpl),

      initialize: function (args) {
        var me = this;

        me.collection = DataFactory.getData("groups");
      },

      render: function(){
        var me                = this,
            jEl               = $(this.template()),
            jSearchContainer  = jEl.find(".search-container"),
            jGridContainer    = jEl.find(".grid-container"),
            jBtnAddGroup      = jEl.find("#add-group")
        ;

        var columns = [{
          name: "name",
          label: "Name",
          cell: "string",
          editable: false
        }, {
          cell: ActionCell,
          btn_name: 'Edit',
          btn_class: 'purple',
          btn_fa: 'fa fa-edit',
          action: function(){
            var id = this.model.get("group_id");
            Backbone.history.navigate("/editgroup/" + id, true);
          },
          width: 100
        }, {
          cell: ActionCell,
          btn_name: 'Details',
          btn_class: 'blue-stripe',
          btn_fa: '',
          action: function(){
            var id = this.model.get("group_id");
            Backbone.history.navigate("/groupdetails/" + id, true);
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
          fields: ['name']
        });

        // Render the filter
        jSearchContainer.html( filter.render().el );

        jBtnAddGroup.on("click", function(){
          Backbone.history.navigate("/addgroup", true);
        });

        $(filter.el).find("input").addClass("form-control").attr("placeholder", "Search Group");

        me.$el.html(jEl);

        return this;
      },

      renderAsync: function( callback ){
        var me = this;
        DataFactory.loadData("groups", function(){
          me.render();
          callback( me )
        });
      }

  });
  return View;
});
