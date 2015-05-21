var _ = require('lodash')
var through = require('through')
var fs = require('fs')
var path = require('path')
var split = require('split')
var format = require('util').format

var sheetPath = path.resolve(__dirname, 'sheet.csv')

var parseCsv = through(function(f) {
  var people = _(f.toString().split('\n'))
    .map(function(line) {
      var exploded = line.split(',')
      var name = exploded[0]
      var skill = exploded[1]

      if (!name) {
        return
      }

      return {
        name: name,
        email: name + '@optimizely.com',
        skill: parseInt(skill, 10),
      }
    })
    .filter(function(a) { return !!a; })
    .sortBy('skill')
    .value()

  this.queue(people)
})


function groupify() {
  return through(function(players) {
    var length = players.length
    var groups = _.range(0, 8).map(function() {
      return []
    })

    var counter = 0

    var sampleSizes = [
      [50, 100],
      [0, 50],
      [50, 100],
      [0, 50],
      [0, 100],
      [0, 100],
    ]

    while (players.length > 0) {
      groups.forEach(function(group) {
        if (players.length > 0) {
          group.push(sample(players, sampleSizes[counter]))
        }
      })
      counter++
    }

      console.log(groups)

    this.queue(groups)
  })
}

/**
 * Sample a random person 
 */
function sample(list, percentiles) {
  var size = list.length;

  var bounds = percentiles.map(function(percentile) {
    return Math.floor((percentile / 100) * size)
  })

  var pick = _.random(bounds[0], bounds[1] - 1)

  if (!list[pick]) {
    console.log("invalid pick", pick, list.length, bounds)
  }
  console.log('pick', pick)

  var res = list.splice(pick, 1);
  return res[0]
}


fs.createReadStream(sheetPath)
  .pipe(parseCsv)
  .pipe(groupify())
  .pipe(through(function(groups) {

    var output = groups.map(function(group) {
      return group.map(function(a) {
        return a.name + ' - ' + a.skill
      })
    })

    console.log('groups', output)
  }))
