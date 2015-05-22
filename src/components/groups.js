var Flux = require('flux')
var Players = require('modules/players')
var Bracket = require('modules/bracket')

module.exports = {
  replace: true,

  template: require('./groups.html'),

  created() {
    Flux.bindVueValues(this, {
      players: Players.getters.playerList,
      groups: Bracket.getters.groups,
    })
  },

  data() {
    return {
      seed: 'seed',
      rounds: [
        [75, 100],
        [0, 25],
        [25, 75],
        [0, 100],
        [0, 100],
      ],
      playerInput: '',
      errorMsg: null,
    }
  },

  methods: {
    /**
     * @param {Event} event
     * @param {Player[]} players
     */
    generateGroups(event) {
      event.preventDefault()
      Bracket.actions.createGroups(this.players, this.rounds, this.seed)
    },
  },
}
