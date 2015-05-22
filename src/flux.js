var _ = require('lodash')
var Nuclear = require('nuclear-js')

class VueReactor extends Nuclear.Reactor {

  bindVueValues(viewModel, bindings) {
    if (!viewModel.__unobserveFns) {
      viewModel.__unobserveFns = []

      viewModel.$on('hook:destroyed', () => {
        while (viewModel.__unobserveFns.length) {
          viewModel.__unobserveFns.shift()()
        }
      })
    }

    _.each(bindings, (getter, prop) => {
      viewModel.$set(prop, this.evaluateToJS(getter))
      var unobserve = this.observe(getter, val => {
        viewModel.$set(prop, Nuclear.toJS(val))
      })
      viewModel.__unobserveFns.push(unobserve)
    })
  }

  serialize() {
    return JSON.stringify(Nuclear.toJS(this.__state))
  }

  loadState(state) {
    this.__state = Nuclear.toImmutable(JSON.parse(state))
  }
}

module.exports = new VueReactor({
  debug: true,
})
