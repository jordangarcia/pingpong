var flux = require('flux2');
var actionTypes = require('./action_types');

module.exports = {
  /**
   * Does X on system
   * @param {number} id
   */
  exampleAction: function(id) {
    flux.dispatch(actionTypes.<%= moduleNameCap %>_ACTION1, {
      // payload goes here
      id: id
    });
  },
};
