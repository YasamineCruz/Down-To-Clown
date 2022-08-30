'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Memberships', [
      { userId: 1, groupId: 1, status: 'member'},
      { userId: 2, groupId: 2, status: 'pending'},
      { userId: 3, groupId: 3, status: 'co-host'}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Memberships', {
      userId: { [Op.in] : [1, 2, 3] }
    }, {});
  }
};
