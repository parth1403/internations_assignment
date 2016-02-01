require.config({
  shim: {
    jquery: {
      exports: "jQuery"
    },
    underscore: {
      exports: "_"
    },
    backbone: {
      exports: "Backbone",
    },
    backgrid: {
      deps: ['jquery', 'backbone'],
      exports: 'Backgrid'
    },
    backgridfilter: {
      deps: ['backgrid'],
    },
    sol: {
      deps: ['jquery']
    }
  },
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    backgrid: '../bower_components/backgrid/lib/backgrid.min',
    text: '../bower_components/text/text',
    backgridfilter: '../bower_components/backgrid-filter/backgrid-filter.min',
    sol: '../libs/sol/sol'
  }
});

require([
  'backbone',
  'routers/Router'
], function ( Backbone, Router ) {
  var router = new Router();
  Backbone.history.start();
});
