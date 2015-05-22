var Vue = require('vue')
var Flux = require('flux')
var App = require('modules/app')
var controllerComponent = require('components/controller')

Vue.config.debug = true

// setup persistence to local storage
Flux.observe(_.debounce(App.actions.persistState))

App.actions.initializeState()

var Controller = Vue.extend(controllerComponent)
new Controller({
  el: '#app',
})
