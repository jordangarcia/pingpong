var Nuclear = require('nuclear-js');
var toImmutable = Nuclear.toImmutable;
var actionTypes = require('../action_types');

module.exports = Nuclear.Store({
  getInitialState: function() {
    return toImmutable({
      currentView: null,
    });
  },

  initialize: function() {
    this.on(actionTypes.APP_SWITCH_VIEW, switchView)
  },
});

/**
 * @param {Immutable.Map} state
 * @param {Object} payload
 * @param {String} payload.view
 */
function switchView(state, payload) {
  return state.set('currentView', payload.view)
}
