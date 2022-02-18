'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Transaction', 'stockTaken', { type: DataTypes.BOOLEAN, defaultValue: false });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Transaction', 'stockTaken', { });
  }
};
