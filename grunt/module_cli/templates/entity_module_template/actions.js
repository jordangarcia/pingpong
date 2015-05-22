var _ = require('lodash');
var definition = require('./entity_definition');
var RestApi = require('modules/rest_api');

var baseEntityActions = RestApi.createEntityActions(definition);

module.exports = _.extend({}, baseEntityActions, {
  // implement actions here
});
