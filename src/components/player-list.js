var Flux = require('flux')
var App = require('modules/app')
var Players = require('modules/players')
var Bracket = require('modules/bracket')

module.exports = {
  replace: true,

  template: require('./player-list.html'),

  created() {
    Flux.bindVueValues(this, {
      players: Players.getters.playerList,
    })
  },

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
    updatePlayers(players) {
      event.preventDefault()
      this.errorMsg = null;

      players = players.map(player => {
        player.skill = parseInt(player.skill, 10)
        return player
      })

      var isValid = players.every(Players.fns.validatePlayer)
      if (!isValid) {
        this.errorMsg = "Invalid players";
        return
      }

      Players.actions.updatePlayers(players)
      App.actions.showView(App.views.Groups)
    },
  },
}
