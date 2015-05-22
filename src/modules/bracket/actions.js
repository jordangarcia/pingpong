var _ = require('lodash');
var Flux = require('flux');
var actionTypes = require('./action_types');
var fns = require('./fns')

/**
 * @return {Array<Array<Player>>}
 */
exports.createGroups = function(players, percentiles, seed) {
  players = _(players)
    .sortByAll(['skill', 'name'])
    .reverse()
    .value()

  var groups = fns.generateGroups(players, {
    roundRobinPercentiles: percentiles,
    seed: seed,
  })

  Flux.dispatch(actionTypes.CREATE_GROUP, {
    groups: groups
  });
};
