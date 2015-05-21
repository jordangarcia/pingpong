module.exports = {
  dev: [
    'clean',
    'copy:app',
    'connect',
    'webpack:dev',
    'watch',
  ]
}
