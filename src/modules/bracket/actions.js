var Flux = require('flux');
var actionTypes = require('./action_types');
var fns = require('./fns')

/**
 * @return {Array<Array<Player>>}
 */
exports.createGroups = function(players, percentiles, seed) {
  percentiles = percentiles || [
    [75, 100],
    [0, 25],
    [25, 75],
    [0, 100],
    [0, 100],
  ]
  debugger;

  var groups = fns.generateGroups(players, {
    roundRobinPercentiles: percentiles,
    seed: seed,
  })

  Flux.dispatch(actionTypes.CREATE_GROUP, {
    groups: groups
  });
};
