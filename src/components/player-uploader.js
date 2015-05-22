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
      if (players.length === 0) {
        this.errorMsg = 'You must enter a valid player CSV'
        return
      }
      Players.actions.addPlayers(players)

      App.actions.showView(App.views.PlayerList);
    },
  },
}
