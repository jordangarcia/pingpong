var Flux = require('flux')
var App = require('modules/app')
var Players = require('modules/players')

module.exports = {
  replace: true,

  template: require('./player-uploader.html'),

  data() {
    return {
      playerInput: '',
      errorMsg: null,
    }
  },

  methods: {
    /**
     * @param {Event} event
     * @param {String} input
     */
    uploadPlayers(event, input) {
      event.preventDefault()
      this.errorMsg = null;
      var players = Players.fns.parsePlayerCsv(input)
      var isValid = players.every(Players.fns.validatePlayer)
      if (players.length === 0 || !isValid) {
        this.errorMsg = 'You must enter a valid player CSV'
        return
      }
      Players.actions.addPlayers(players)

      App.actions.showView(App.views.Groups);
    },
  },
}
