'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Attendances', [
      { eventId: 1, userId: 1, status: 'member'},
      { eventId: 2, userId: 2, status: 'member'},
      { eventId: 3, userId: 3, status: 'member'}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Attendances', {
      eventId: { [Op.in]: [1, 2, 3]}
    }, {});
  }
};
