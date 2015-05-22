var Flux = require('flux')
var actionTypes = require('./action_types')
var fns = require('./fns')
var uuid = require('node-uuid')

/**
 * @param {Player[]} players
 */
exports.addPlayers = function(players) {
  var withId = players.map(p => {
    p.id = uuid()
  })
  Flux.dispatch(actionTypes.ADD_PLAYERS, {
    players: players,
  })
}

exports.updatePlayers = function(players) {
  Flux.dispatch(actionTypes.UPDATE_PLAYERS, {
    players: players,
  })
}
