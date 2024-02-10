const { Sequelize } = require('sequelize');
 
async function up({ context: queryInterface }) {
  await queryInterface.addColumn('invoices', 'status', {
        type: Sequelize.ENUM('Placed', 'Delivered', 'Cancelled'),
        defaultValue: 'Placed'
      });
    };

async function down({ context: queryInterface }) {
      await queryInterface.removeColumn('invoices', 'status');
}

module.exports = {up,down}