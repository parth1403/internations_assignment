define([
  'backgrid',
  'utils/DataFactory'
], function ( Backgrid, DataFactory) {

  var DeleteCell = Backgrid.Cell.extend({
      template: _.template('<button class="btn btn-xs"><i class="fa fa-trash-o"></i>Delete</button>'),
      events: {
        "click": "deleteRow"
      },
      deleteRow: function (e) {
        e.preventDefault();
        this.model.collection.removeUser(DataFactory, this.model);
      },
      render: function () {
        this.$el.html(this.template());
        this.$el.addClass("delete");
        this.delegateEvents();
        return this;
      }
  });
  return DeleteCell;
});
