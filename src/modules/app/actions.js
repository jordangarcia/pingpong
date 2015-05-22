var Flux = require('flux')
var actionTypes = require('./action_types')

/**
 * @param {ViewEnum} view
 */
exports.showView = function(view) {
  Flux.dispatch(actionTypes.APP_SWITCH_VIEW, {
    view: view
  })
}
