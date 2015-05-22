var Flux = require('flux')
var actionTypes = require('./action_types')
var views = require('./views')

/**
 * @param {ViewEnum} view
 */
exports.showView = function(view) {
  Flux.dispatch(actionTypes.APP_SWITCH_VIEW, {
    view: view
  })
}

exports.persistState = function() {
  window.localStorage.setItem('state', Flux.serialize())
}

exports.initializeState = function() {
  var persistedState = window.localStorage.getItem('state')
  if (persistedState) {
    Flux.loadState(persistedState)
  } else {
    exports.showView(views.PlayerUploader)
  }
}

exports.reset = function() {
  window.localStorage.removeItem('state')
  Flux.reset()
  exports.showView(views.PlayerUploader)
  window.location.reload()
}
