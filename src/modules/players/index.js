var Flux = require('flux');

// register stores with Flux system
Flux.registerStores({
  players: require('./stores/players_store'),
});

module.exports = {
  actions: require('./actions'),

  fns: require('./fns'),

  getters: require('./getters'),
};
