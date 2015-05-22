var path = require('path')

module.exports = {
  app: {
    cwd: path.join(__dirname, '../src/app'),
    src: ['*.html', 'static/**'],
    dest: path.join(__dirname, '../dist/'),
    expand: true,
  }
}
