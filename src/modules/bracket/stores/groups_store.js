var Nuclear = require('nuclear-js');
var toImmutable = Nuclear.toImmutable;
var actionTypes = require('../action_types');

module.exports = Nuclear.Store({
  getInitialState: function() {
    return toImmutable([]);
  },

  initialize: function() {
    this.on(actionTypes.CREATE_GROUP, createGroup)
  },
});

/**
 * @param {Immutable.Map} state
 * @param {Object} payload
 * @param {Group[]} payload.groups
 */
function createGroup(state, payload) {
  return toImmutable(payload.groups)
}
