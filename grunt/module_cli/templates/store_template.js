var Nuclear = require('nuclear-js');
var toImmutable = Nuclear.toImmutable;
var actionTypes = require('../action_types');

/**
 * <%= storeNameCamel %>
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
    return toImmutable({
      customState: null,
    });
  },

  initialize: function() {
    this.on(actionTypes.<%= moduleNameCap %>_ACTION_1, handleExampleAction);
  },
});

/**
 * Handler for actionTypes.<%= moduleNameCap %>_ACTION_TYPE
 *
 * @param {Immutable.Map} state
 * @param {Object} payload
 * @param {number} payload.id
 */
function handleExampleAction(state, payload) {
  return state.set('customState', payload.id);
}
