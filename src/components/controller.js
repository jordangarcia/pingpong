var App = require('modules/app')
var Flux = require('flux')

var components = {}
components[App.views.PlayerUploader] = require('./player-uploader')
components[App.views.PlayerList] = require('./player-list')
components[App.views.Groups] = require('./groups')

module.exports = {
  replace: true,

  template: require('./controller.html'),

  components: components,

  data() {
    return {
      views: App.views
    }
  },

  created() {
    Flux.bindVueValues(this, {
      currentView: App.getters.currentView
    })
  },

  methods: {
    showView: function(view) {
      App.actions.showView(view)
    },
  },
}
