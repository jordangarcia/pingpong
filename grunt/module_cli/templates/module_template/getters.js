/**
 * Getters for <%= moduleNameCamel %>
 */
module.exports = {
  exampleGetter: ['example', 'id'],

  /**
   * @param {number} id
   * @return {Getter}
   */
  getterFn: function(id) {
    return ['example', id];
  },
};
