'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('CardType', 'profitA', { type: DataTypes.DOUBLE, defaultValue: 0 });
    await queryInterface.addColumn('CardType', 'profitB', { type: DataTypes.DOUBLE, defaultValue: 0 });
    await queryInterface.addColumn('CardType', 'profitC', { type: DataTypes.DOUBLE, defaultValue: 0 });
    await queryInterface.addColumn('Wallet', 'profit', { 
      type: DataTypes.DOUBLE.UNSIGNED,
      allowNull: false,
      defaultValue: 0, 
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('CardType', 'profitA', { });
    await queryInterface.removeColumn('CardType', 'profitB', { });
    await queryInterface.removeColumn('CardType', 'profitC', { });
    await queryInterface.removeColumn('Wallet', 'profit', { });
  }
  
};
