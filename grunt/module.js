var prompt = require('./module_cli/prompt')

module.exports = function(grunt) {
  grunt.registerTask('module:create', function() {
    var done = this.async()

    prompt(grunt, done)
  })
}
