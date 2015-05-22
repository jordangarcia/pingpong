var Nuclear = require('nuclear-js');
var toImmutable = Nuclear.toImmutable;
var actionTypes = require('../action_types');

module.exports = Nuclear.Store({
  getInitialState: function() {
    return toImmutable({});
  },

  initialize: function() {
  },
});

/**
 * Handler for actionTypes.BRACKET_ACTION_TYPE
 *
 * @param {Immutable.Map} state
 * @param {Object} payload
 * @param {number} payload.id
 */
function handleExampleAction(state, payload) {
  return state.set('customState', payload.id);
}
