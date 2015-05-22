/**
 * Module specific pure functions
 */
var seedrandom = require('seedrandom')

/**
 * @param {Player[]} players
 * @param {Object} opts
 * @param {Array<Array>} opts.roundRobinPercentiles
 * @return {Array<Array<Player>>}
 */
exports.generateGroups = function(players, opts) {
  var seed = opts.seed || 'seed'
  var randomIntFn = createRandomIntFn(seed)
  var perGroup = 4
  var n = players.length
  var g = Math.floor(n / perGroup)
  var r = n % perGroup

  if (r === perGroup - 1) {
    g++;
  }

  var groups = _.range(0, g).map(_ => [])
  var players = _.sortBy(players, 'skill')
  var roundNum = 0

  while (players.length > 0) {
    var percentile = opts.roundRobinPercentiles[roundNum]
    groups.forEach(function(group) {
      if (players.length > 0) {
        group.push(sample(players, percentile, randomIntFn))
      }
    })
    roundNum++
  }

  return groups
}


/**
 * Sample a random person
 * @param {Object[]} list
 * @param {Array} percentiles
 * @return {Object}
 */
function sample(list, percentiles, randomFn) {
  var size = list.length;

  var bounds = percentiles.map(function(percentile) {
    return Math.floor((percentile / 100) * size)
  })

  var pick = randomFn(bounds[0], bounds[1] - 1)

  if (!list[pick]) {
    throw new Error("Invalid pick")
  }

  var res = list.splice(pick, 1);
  return res[0]
}


function createRandomIntFn(seed) {
  var rng = seedrandom(seed)

  return function(min, max) {
    return Math.floor(rng() * (max - min)) + min;
  }
}
