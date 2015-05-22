var path = require('path')

module.exports = {
  app: {
    files: ['src/app/*.html', 'src/app/static/*'],
    tasks: ['copy:app']
  },
}
