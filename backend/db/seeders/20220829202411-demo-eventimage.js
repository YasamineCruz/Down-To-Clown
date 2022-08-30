'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('EventImages', [
      { eventId: 1, url: "www.letsgetit.com", preview: true},
      { eventId: 2, url: "www.lemmeCat.com", preview: false},
      { eventId: 3, url: "www.nachosCheesey.org", preview: true},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('EventImages', {
      eventId: { [Op.in] : [1, 2, 3] }
    }, {});
  }
};
