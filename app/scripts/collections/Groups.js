define([
  'jquery',
  'backbone',
  'config',
  'models/Groups'
  ], function ($, Backbone, Configuration, Model) {

    var url = Configuration.services[Configuration.environment].groups;
    var Collection = Backbone.Collection.extend({
        url: url,
        model: Model
    });

    return Collection;
});
