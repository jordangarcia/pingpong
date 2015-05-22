var Flux = require('flux');

// register stores with Flux system
Flux.registerStores({
  //bracket: require('./stores/bracket_store'),
  groups: require('./stores/groups_store'),
});

module.exports = {
  actions: require('./actions'),

  fns: require('./fns'),

  getters: require('./getters'),
};
