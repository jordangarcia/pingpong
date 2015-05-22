var Flux = require('flux');

// register stores with Flux system
Flux.registerStores({
  ui: require('./stores/ui_store'),
});

module.exports = {
  actions: require('./actions'),

  fns: require('./fns'),

  getters: require('./getters'),

  views: require('./views'),
};
