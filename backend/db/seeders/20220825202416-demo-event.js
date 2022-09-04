'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Events', [
      { venueId: 1, groupId: 1, name: "Bees", description: "Bees for weeks", type: "In person", capacity: 34, price: 23, startDate: "2023-11-19 20:00:00", endDate: "2023-11-20 20:00:00"},
      { venueId: 2, groupId: 2, name: "Shark Week", description: "Shark week", type: "Online", capacity: 23, price: 21, startDate: "2023-11-21 20:00:00", endDate: "2023-11-22 20:00:00"},
      { venueId: 3, groupId: 3, name: "Community outreach", description: "Reaching others", type: "In person", capacity: 40, price: 33, startDate: "2023-11-23 20:00:00", endDate: "2023-11-24 21:00:00"}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Events', {
      venueId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
