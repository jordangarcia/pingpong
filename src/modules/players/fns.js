var _ = require('lodash')

/**
 * @param {String} input
 * @return {Player[]}
 */
exports.parsePlayerCsv = function(input) {
  var people = _(input.trim().split('\n'))
    .drop(1)
    .map(line => {
      var exploded = line.split('\t')
      var email = exploded[0]
      var skill = parseInt(exploded[1], 10)

      if (!email) {
        return
      }

      var name = email.split('@')[0]

      return {
        name: name,
        email: email,
        skill: skill,
      }
    })
    .filter(a => !!a)
    .value()

  return people || []
}

exports.validatePlayer = function(player) {
  if (!player.name || player.name.length === 0) {
    return false
  }
  if (
    !player.skill ||
    player.skill < 1 ||
    player.skill > 5
  ) {
    return false
  }

  return true
}
