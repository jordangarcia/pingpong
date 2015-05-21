var path = require('path')

module.exports = {
  app: {
    cwd: path.join(__dirname, '../src/app'),
    files: ['*.html', 'static/*'],
    options: {
      interval: 1200,
    },
    tasks: ['copy:app']
  },
}
