define([
  'jquery',
  'backbone',
  'config',
  'models/Users'
  ], function ($, Backbone, Configuration, Model) {

    var url = Configuration.services[Configuration.environment].groupusers;
    var Collection = Backbone.Collection.extend({
        url: url,
        model: Model
    });

    return Collection;
});
