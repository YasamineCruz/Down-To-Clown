'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Memberships', [
      { userId: 1, groupId: 1, status: 'organizer'},
      { userId: 2, groupId: 2, status: 'organizer'},
      { userId: 3, groupId: 3, status: 'organizer'}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Memberships', {
      userId: { [Op.in] : [1, 2, 3] }
    }, {});
  }
};
