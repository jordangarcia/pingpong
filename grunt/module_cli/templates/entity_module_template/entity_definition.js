/**
 * Entity Definition for <%= moduleNameCamel %>
 */
module.exports = {
  entity: '<%= entity %>',
<% if (parentEntity) { %>
  parent: {
    entity: '<%= parentEntity %>',
    key: '<%= parentKey %>',
  },<% } %>

  /**
   * Optional definitions
  // fieldTypes are used for client side sorting / filtering
  fieldTypes: {
    id: fieldTypes.NUMBER,
    project_id: fieldTypes.NUMBER,
    name: fieldTypes.STRING,
    description: fieldTypes.STRING,
    last_modified: fieldTypes.STRING,
    conditions: fieldTypes.ARRAY,
    segmentation: fieldTypes.BOOLEAN,
  },
   */
};
