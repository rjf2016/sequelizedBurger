"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('burgers', [
         {store_id: 1, name: 'Murder Burger', devoured: 0, created_at: new Date(), updated_at: new Date()},
         {store_id: 2, name: 'Big Mac', devoured: 0, created_at: new Date(), updated_at: new Date()},
         {store_id: 3, name: 'Whopper', devoured: 0, created_at: new Date(), updated_at: new Date()}
        ], {});
    },

  down: function(queryInterface, Sequelize) {
    return queryInterface
      .dropTable('burgers');
  }
};