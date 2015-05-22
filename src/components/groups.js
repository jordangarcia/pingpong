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

    this.generateGroups()
  },

  data() {
    return {
      showSkill: true,
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
    groupName(ind) {
      var names = ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'I', 'J', 'K'];
      return names[ind]
    },
    /**
     * @param {Event} event
     */
    generateGroups(event) {
      if (event) {
        event.preventDefault()
      }
      Bracket.actions.createGroups(this.players, this.rounds, this.seed)
    },
  },
}
