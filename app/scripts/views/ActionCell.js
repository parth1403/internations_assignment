define([
  'backgrid',
], function ( Backgrid) {

  var ActionCell = Backgrid.Cell.extend({
      template: _.template('<button class="btn btn-xs <%= btn_class %>"><i class="<%= btn_fa %>"></i><%= btn_name %></button>'),
      events: {
        "click": "goToDetails"
      },
      goToDetails: function (e) {
        e.preventDefault();
        var action = this.column.get("action");
        if(typeof action == "function"){
          action.call(this);
        }
      },
      render: function () {
        var btn_name = this.column.get("btn_name");
        var btn_fa = this.column.get("btn_fa");
        var btn_class = this.column.get("btn_class");
        this.$el.html(this.template({btn_name: btn_name, btn_fa: btn_fa, btn_class: btn_class}));
        this.$el.addClass("action");
        this.delegateEvents();
        return this;
      }
  });
  return ActionCell;
});
