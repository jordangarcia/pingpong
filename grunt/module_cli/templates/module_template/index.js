var flux = require('flux2');
<% if (stores.length > 0){ %>
// register stores with Flux system
flux.registerStores({
<% _.forEach(stores, function(store) { %>  <%= store.camel %>: require('./stores/<%= store.filename %>'),
<% }) %>});
<% } %>
module.exports = {
  actions: require('./actions'),

  fns: require('./fns'),

  getters: require('./getters'),
};
