var Nuclear = require('nuclear-js')
var toImmutable = Nuclear.toImmutable
var actionTypes = require('../action_types')

/**
 * playerStore
 * Responsible for the following state management:
 * TODO: fill in
 */
module.exports = Nuclear.Store({
  /**
   * Initial state of store when registered with NuclearJS Flux system
   * default returns an Immutable.Map
   * Note: must return an immutable value
   */
  getInitialState: function() {
    return toImmutable({})
  },

  initialize: function() {
    this.on(actionTypes.ADD_PLAYERS, addPlayers)
    this.on(actionTypes.UPDATE_PLAYERS, updatePlayers)
  },
})

/**
 * @param {Immutable.Map} state
 * @param {Object} payload
 * @param {Player[]} payload.players
 */
function addPlayers(state, payload) {
  return state.withMutations(function(state) {
    payload.players.forEach(function(player) {
      state.set(player.id, toImmutable(player))
    })
  })
}

/**
 * @param {Immutable.Map} state
 * @param {Object} payload
 * @param {Player[]} payload.players
 */
function updatePlayers(state, payload) {
  return addPlayers(toImmutable({}), payload)
}
