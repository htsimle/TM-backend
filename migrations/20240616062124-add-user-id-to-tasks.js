'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Step 1: Add user_id column allowing NULL values
    await queryInterface.addColumn('Tasks', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Users', // name of the target table
        key: 'id', // key in the target table that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
     await queryInterface.sequelize.query('UPDATE "Tasks" SET "user_id" = 1 WHERE "user_id" IS NULL');

    // Step 3: Change user_id column to disallow NULL values
    await queryInterface.changeColumn('Tasks', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tasks', 'user_id');
  }
};
