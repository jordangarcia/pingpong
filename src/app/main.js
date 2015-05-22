var Vue = require('vue')
var Flux = require('flux')
var App = require('modules/app')
var controllerComponent = require('../components/controller')

Vue.config.debug = true

Flux.observe(state => {
  window.localStorage.setItem('state', Flux.serialize())
})

var persistedState = window.localStorage.getItem('state')
if (persistedState) {
  Flux.loadState(persistedState)
} else {
  App.actions.showView(App.views.PlayerUploader)
}

var Controller = Vue.extend(controllerComponent)
new Controller({
  el: '#app',
})

window.a = {
  App: require('../modules/app'),
  Players: require('../modules/players'),
}
